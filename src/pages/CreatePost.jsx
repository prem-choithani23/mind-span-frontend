import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Heading1,
    Heading2,
    Quote,
    List,
    Code2,
    Image as ImageIcon,
    Link2,
    HelpCircle,
    X,
    Eye,
    PenLine,
    Loader2,
    ChevronDown,
    Check,
    AlertCircle,
    ArrowLeft,
} from "lucide-react";
import { createPost } from "../api/services/postService.js";
import { getAllCategories } from "../api/services/categoryService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useRole } from "../hooks/useRole.js";
import { useToast } from "../context/ToastContext.jsx";

const DRAFT_KEY = "mindspan:create-post-draft";
const URL_MAX_LEN = 255;

const MARKDOWN_GUIDE = [
    { syntax: "# Heading 1", result: "Biggest heading" },
    { syntax: "## Heading 2", result: "Section heading" },
    { syntax: "**bold text**", result: "Bold text" },
    { syntax: "*italic text*", result: "Italic text" },
    { syntax: "<u>underlined</u>", result: "Underlined text" },
    { syntax: "> quoted text", result: "Blockquote" },
    { syntax: "- list item", result: "Bullet list (press Enter to continue it)" },
    { syntax: "1. list item", result: "Numbered list (auto-increments)" },
    { syntax: "[label](https://url)", result: "Link" },
    { syntax: "![alt](https://url)", result: "Image" },
    { syntax: "`inline code`", result: "Inline code" },
    { syntax: "```\ncode block\n```", result: "Code block" },
];

const SHORTCUTS = [
    { keys: "Ctrl/Cmd + B", result: "Bold selected text" },
    { keys: "Ctrl/Cmd + I", result: "Italic selected text" },
    { keys: "Ctrl/Cmd + U", result: "Underline selected text" },
    { keys: "Ctrl/Cmd + K", result: "Insert link" },
    { keys: "Tab / Shift+Tab", result: "Indent / outdent" },
    { keys: "Enter in a list", result: "Continues the list automatically" },
];

// ---------- helpers ----------

function wordCount(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
}

function useDebouncedLocalDraft({ title, excerpt, content, categoryId }, enabled) {
    const [justSaved, setJustSaved] = useState(false);
    const timerRef = useRef(null);
    const flashRef = useRef(null);

    useEffect(() => {
        if (!enabled) return;
        if (!title && !content && !excerpt) return;
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            try {
                localStorage.setItem(
                    DRAFT_KEY,
                    JSON.stringify({ title, excerpt, content, categoryId, savedAt: Date.now() })
                );
                setJustSaved(true);
                clearTimeout(flashRef.current);
                flashRef.current = setTimeout(() => setJustSaved(false), 1800);
            } catch {
                // storage unavailable (e.g. private mode) — fail silently
            }
        }, 700);
        return () => clearTimeout(timerRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, excerpt, content, categoryId, enabled]);

    return justSaved;
}

// ---------- toolbar ----------

const TOOLBAR_ITEMS = [
    { key: "bold", icon: Bold, label: "Bold (Ctrl+B)", type: "wrap", before: "**", after: "**" },
    { key: "italic", icon: Italic, label: "Italic (Ctrl+I)", type: "wrap", before: "*", after: "*" },
    { key: "underline", icon: UnderlineIcon, label: "Underline (Ctrl+U)", type: "wrap", before: "<u>", after: "</u>" },
    { key: "divider-1", divider: true },
    { key: "h1", icon: Heading1, label: "Heading 1", type: "line", prefix: "# " },
    { key: "h2", icon: Heading2, label: "Heading 2", type: "line", prefix: "## " },
    { key: "quote", icon: Quote, label: "Quote", type: "line", prefix: "> " },
    { key: "list", icon: List, label: "Bullet list", type: "line", prefix: "- " },
    { key: "divider-2", divider: true },
    { key: "code", icon: Code2, label: "Code block", type: "wrap", before: "```\n", after: "\n```" },
    { key: "image", icon: ImageIcon, label: "Insert image", type: "image" },
    { key: "link", icon: Link2, label: "Insert link (Ctrl+K)", type: "link" },
];

function ToolbarButton({ icon: Icon, label, onClick, onMouseDown }) {
    return (
        <button
            type="button"
            onMouseDown={onMouseDown}
            onClick={onClick}
            title={label}
            aria-label={label}
            className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                       text-gray-500 dark:text-[#94979e] transition-all duration-150
                       hover:bg-[#f5f5f5] hover:text-sky-500 dark:hover:bg-white/10 dark:hover:text-pink-300
                       active:scale-90"
        >
            <Icon size={17} strokeWidth={2} />
        </button>
    );
}

function EditorToolbar({ onWrap, onLinePrefix, onImage, onLink, onHelp, onCaptureSelection }) {
    return (
        <div
            className="flex items-center gap-0.5 overflow-x-auto rounded-xl border border-[#ebebeb]
                       dark:border-white/10 bg-white dark:bg-[#2e3141] px-2 py-1.5"
        >
            {TOOLBAR_ITEMS.map((item) => {
                if (item.divider) {
                    return <span key={item.key} className="mx-1 h-5 w-px shrink-0 bg-[#ebebeb] dark:bg-white/10" />;
                }
                const clickHandlers = {
                    wrap: () => onWrap(item.before, item.after),
                    line: () => onLinePrefix(item.prefix),
                    image: onImage,
                    link: onLink,
                };
                return (
                    <ToolbarButton
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        onMouseDown={onCaptureSelection}
                        onClick={clickHandlers[item.type]}
                    />
                );
            })}
            <span className="mx-1 h-5 w-px shrink-0 bg-[#ebebeb] dark:bg-white/10" />
            <ToolbarButton icon={HelpCircle} label="Markdown help" onClick={onHelp} />
        </div>
    );
}

// ---------- markdown help drawer ----------

function MarkdownHelp({ open, onClose }) {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-200 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!open}
        >
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div
                className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-[#212435]
                            text-black dark:text-white shadow-2xl transition-transform duration-300 ease-out
                            ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between border-b border-[#ebebeb] dark:border-white/10 px-5 py-4">
                    <h3 className="font-semibold">Markdown, quickly</h3>
                    <button
                        onClick={onClose}
                        aria-label="Close markdown help"
                        className="rounded-full p-1.5 text-gray-500 dark:text-[#94979e] transition-colors
                                   hover:bg-[#f5f5f5] dark:hover:bg-white/10"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="h-[calc(100%-64px)] overflow-y-auto p-5">
                    <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-[#94979e]">
                        Markdown is plain text with a few symbols that control formatting. Type the
                        syntax on the left and it becomes the result on the right — or select text
                        and use the toolbar, which does it for you.
                    </p>

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#7d7f88]">
                        Syntax
                    </p>
                    <div className="mb-6 space-y-1">
                        {MARKDOWN_GUIDE.map((item) => (
                            <div
                                key={item.syntax}
                                className="flex items-start justify-between gap-3 border-b border-[#ebebeb] dark:border-white/10 py-2"
                            >
                                <code className="whitespace-pre rounded bg-[#f5f5f5] dark:bg-white/10 px-2 py-1 font-mono text-xs">
                                    {item.syntax}
                                </code>
                                <span className="pt-1 text-right text-xs text-gray-400 dark:text-[#94979e]">
                                    {item.result}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#7d7f88]">
                        Keyboard shortcuts
                    </p>
                    <div className="space-y-1">
                        {SHORTCUTS.map((item) => (
                            <div
                                key={item.keys}
                                className="flex items-start justify-between gap-3 border-b border-[#ebebeb] dark:border-white/10 py-2"
                            >
                                <code className="whitespace-pre rounded bg-[#f5f5f5] dark:bg-white/10 px-2 py-1 font-mono text-xs">
                                    {item.keys}
                                </code>
                                <span className="pt-1 text-right text-xs text-gray-400 dark:text-[#94979e]">
                                    {item.result}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------- image / link insert modal ----------

function InsertMediaModal({ mode, initialLabel, onCancel, onConfirm }) {
    const [url, setUrl] = useState("");
    const [label, setLabel] = useState(initialLabel || "");
    const [status, setStatus] = useState("idle"); // idle | checking | valid | invalid
    const checkIdRef = useRef(0);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // verify the image actually loads before letting the user confirm
    useEffect(() => {
        if (mode !== "image") return;
        const trimmed = url.trim();
        if (!trimmed) {
            setStatus("idle");
            return;
        }

        const myId = ++checkIdRef.current;
        setStatus("checking");

        const timer = setTimeout(() => {
            const img = new window.Image();
            const timeout = setTimeout(() => {
                if (checkIdRef.current === myId) setStatus("invalid");
            }, 8000);

            img.onload = () => {
                clearTimeout(timeout);
                if (checkIdRef.current === myId) setStatus("valid");
            };
            img.onerror = () => {
                clearTimeout(timeout);
                if (checkIdRef.current === myId) setStatus("invalid");
            };
            img.src = trimmed;
        }, 450);

        return () => clearTimeout(timer);
    }, [url, mode]);

    const isImage = mode === "image";
    const trimmedUrl = url.trim();
    const canConfirm = isImage ? status === "valid" : trimmedUrl.length > 0;

    const handleConfirm = () => {
        if (!canConfirm) return;
        onConfirm(trimmedUrl, label.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div
                className="w-full max-w-lg rounded-2xl border border-[#ebebeb] dark:border-white/10
                           bg-white dark:bg-[#212435] text-black dark:text-white shadow-2xl"
            >
                <div className="flex items-center justify-between border-b border-[#ebebeb] dark:border-white/10 px-5 py-4">
                    <h3 className="font-semibold">{isImage ? "Insert image" : "Insert link"}</h3>
                    <button
                        onClick={onCancel}
                        aria-label="Close"
                        className="rounded-full p-1.5 text-gray-500 dark:text-[#94979e] transition-colors
                                   hover:bg-[#f5f5f5] dark:hover:bg-white/10"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-[1fr_140px]">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-[#94979e]">
                                <span>{isImage ? "Image URL" : "URL"}</span>
                                <span>{url.length}/{URL_MAX_LEN}</span>
                            </label>
                            <input
                                ref={inputRef}
                                value={url}
                                maxLength={URL_MAX_LEN}
                                onChange={(e) => setUrl(e.target.value.slice(0, URL_MAX_LEN))}
                                placeholder={isImage ? "https://example.com/photo.jpg" : "https://example.com"}
                                className="w-full rounded-lg border border-[#ebebeb] dark:border-white/10
                                           bg-white dark:bg-[#2e3141] px-3 py-2 text-sm
                                           focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100
                                           dark:focus:border-pink-300 dark:focus:ring-pink-300/20"
                            />
                            {isImage && (
                                <div className="mt-2 flex items-center gap-1.5 text-xs">
                                    {status === "checking" && (
                                        <span className="flex items-center gap-1.5 text-gray-400 dark:text-[#94979e]">
                                            <Loader2 size={13} className="animate-spin" /> Checking image...
                                        </span>
                                    )}
                                    {status === "valid" && (
                                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                                            <Check size={13} /> Image found
                                        </span>
                                    )}
                                    {status === "invalid" && (
                                        <span className="flex items-center gap-1.5 text-red-500">
                                            <AlertCircle size={13} /> Couldn't load an image from that URL
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">
                                {isImage ? "Alt text (optional)" : "Link text (optional)"}
                            </label>
                            <input
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder={isImage ? "Describes the image for screen readers" : "Text readers will click"}
                                className="w-full rounded-lg border border-[#ebebeb] dark:border-white/10
                                           bg-white dark:bg-[#2e3141] px-3 py-2 text-sm
                                           focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100
                                           dark:focus:border-pink-300 dark:focus:ring-pink-300/20"
                            />
                        </div>
                    </div>

                    {isImage && (
                        <div
                            className="flex h-[140px] w-full items-center justify-center overflow-hidden rounded-lg
                                       border border-dashed border-[#ebebeb] dark:border-white/10
                                       bg-[#f7f7f7] dark:bg-[#2e3141]"
                        >
                            {status === "valid" ? (
                                <img src={trimmedUrl} alt="Preview" className="h-full w-full object-cover" />
                            ) : status === "checking" ? (
                                <Loader2 size={20} className="animate-spin text-gray-400 dark:text-[#94979e]" />
                            ) : (
                                <ImageIcon size={20} className="text-gray-300 dark:text-[#5c5f6b]" />
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-2 border-t border-[#ebebeb] dark:border-white/10 px-5 py-4">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-[#ebebeb] dark:border-white/10 px-4 py-2 text-sm
                                   font-medium transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!canConfirm}
                        className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white
                                   transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---------- main page ----------

export default function CreatePost() {
    const { user } = useAuth();
    const { canWritePost } = useRole();
    const editorRef = useRef(null);
    const selectionRef = useRef({ start: 0, end: 0 });
    const navigate = useNavigate();
    const showToast = useToast();

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [file, setFile] = useState(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState(null);
    const [publishing, setPublishing] = useState(null); // null | "draft" | "publish"
    const [helpOpen, setHelpOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [mobileView, setMobileView] = useState("write"); // "write" | "preview"
    const [restoreBanner, setRestoreBanner] = useState(false);
    const [mediaModal, setMediaModal] = useState(null); // null | "image" | "link"
    const restoreDraftRef = useRef(null);

    useEffect(() => {
        getAllCategories()
            .then((res) => {
                const list = res.data || [];
                setCategories(list);
                if (!categoryId && list.length > 0) {
                    setCategoryId(list[0].id);
                }
            })
            .catch(() => {});
    }, []);

    // Offer to restore a locally saved draft on first load
    useEffect(() => {
        try {
            const raw = localStorage.getItem(DRAFT_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.title || parsed?.content) {
                    restoreDraftRef.current = parsed;
                    setRestoreBanner(true);
                }
            }
        } catch {
            // ignore malformed/unavailable storage
        }
    }, []);

    useEffect(() => {
        if (!file) {
            setFilePreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const justSaved = useDebouncedLocalDraft(
        { title, excerpt, content, categoryId },
        !restoreBanner
    );

    if (!user || !canWritePost) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#212435] text-gray-500 dark:text-[#94979e]">
                You are not authorized to create posts.
            </div>
        );
    }

    // ---- selection capture (keeps the textarea's selection alive through a button click) ----

    const captureSelection = (e) => {
        e.preventDefault(); // stops the textarea from losing focus/selection on click
        const el = editorRef.current;
        if (el) {
            selectionRef.current = { start: el.selectionStart, end: el.selectionEnd };
        }
    };

    // ---- editor insertion helpers (operate on the captured selection, update React state) ----

    const wrapSelection = (before, after = "") => {
        const el = editorRef.current;
        if (!el) return;
        const { start, end } = selectionRef.current;
        const selected = content.substring(start, end) || "text";
        const next = content.substring(0, start) + before + selected + after + content.substring(end);
        setContent(next);
        requestAnimationFrame(() => {
            el.focus();
            const cursor = start + before.length + selected.length + after.length;
            el.setSelectionRange(cursor, cursor);
            selectionRef.current = { start: cursor, end: cursor };
        });
    };

    const prefixCurrentLine = (prefix) => {
        const el = editorRef.current;
        if (!el) return;
        const { start } = selectionRef.current;
        const lineStart = content.lastIndexOf("\n", start - 1) + 1;
        const next = content.substring(0, lineStart) + prefix + content.substring(lineStart);
        setContent(next);
        requestAnimationFrame(() => {
            el.focus();
            const cursor = start + prefix.length;
            el.setSelectionRange(cursor, cursor);
            selectionRef.current = { start: cursor, end: cursor };
        });
    };

    const insertAtSelection = (text) => {
        const el = editorRef.current;
        if (!el) return;
        const { start, end } = selectionRef.current;
        const next = content.substring(0, start) + text + content.substring(end);
        setContent(next);
        requestAnimationFrame(() => {
            el.focus();
            const cursor = start + text.length;
            el.setSelectionRange(cursor, cursor);
            selectionRef.current = { start: cursor, end: cursor };
        });
    };

    // ---- keyboard shortcuts + smart list/tab handling ----

    const handleEditorKeyDown = (e) => {
        const el = editorRef.current;
        if (!el) return;
        const mod = e.metaKey || e.ctrlKey;

        if (mod && e.key.toLowerCase() === "b") {
            e.preventDefault();
            selectionRef.current = { start: el.selectionStart, end: el.selectionEnd };
            wrapSelection("**", "**");
            return;
        }
        if (mod && e.key.toLowerCase() === "i") {
            e.preventDefault();
            selectionRef.current = { start: el.selectionStart, end: el.selectionEnd };
            wrapSelection("*", "*");
            return;
        }
        if (mod && e.key.toLowerCase() === "u") {
            e.preventDefault();
            selectionRef.current = { start: el.selectionStart, end: el.selectionEnd };
            wrapSelection("<u>", "</u>");
            return;
        }
        if (mod && e.key.toLowerCase() === "k") {
            e.preventDefault();
            selectionRef.current = { start: el.selectionStart, end: el.selectionEnd };
            setMediaModal("link");
            return;
        }

        if (e.key === "Tab") {
            e.preventDefault();
            const { selectionStart: start, selectionEnd: end, value } = el;
            if (!e.shiftKey) {
                const next = value.slice(0, start) + "  " + value.slice(end);
                setContent(next);
                requestAnimationFrame(() => {
                    el.focus();
                    el.setSelectionRange(start + 2, start + 2);
                });
            } else {
                const lineStart = value.lastIndexOf("\n", start - 1) + 1;
                const removable = value.slice(lineStart, lineStart + 2) === "  " ? 2 : 0;
                const next = value.slice(0, lineStart) + value.slice(lineStart + removable);
                setContent(next);
                requestAnimationFrame(() => {
                    el.focus();
                    const cursor = Math.max(lineStart, start - removable);
                    el.setSelectionRange(cursor, cursor);
                });
            }
            return;
        }

        if (e.key === "Enter") {
            const { selectionStart: start, value } = el;
            const lineStart = value.lastIndexOf("\n", start - 1) + 1;
            const currentLine = value.slice(lineStart, start);
            const bulletMatch = currentLine.match(/^(\s*)([-*+])\s(.*)$/);
            const numberMatch = currentLine.match(/^(\s*)(\d+)\.\s(.*)$/);

            if (bulletMatch || numberMatch) {
                e.preventDefault();
                const [, indent, marker, rest] = bulletMatch || numberMatch;
                if (rest.trim() === "") {
                    const next = value.slice(0, lineStart) + value.slice(start);
                    setContent(next);
                    requestAnimationFrame(() => {
                        el.focus();
                        el.setSelectionRange(lineStart, lineStart);
                    });
                } else {
                    const nextMarker = bulletMatch ? marker : `${parseInt(marker, 10) + 1}.`;
                    const insertion = `\n${indent}${nextMarker} `;
                    const next = value.slice(0, start) + insertion + value.slice(start);
                    setContent(next);
                    requestAnimationFrame(() => {
                        el.focus();
                        const cursor = start + insertion.length;
                        el.setSelectionRange(cursor, cursor);
                    });
                }
            }
        }
    };

    const openImageModal = () => setMediaModal("image");
    const openLinkModal = () => setMediaModal("link");

    const handleMediaConfirm = (url, extra) => {
        const { start, end } = selectionRef.current;
        const selectedText = content.substring(start, end);
        if (mediaModal === "image") {
            insertAtSelection(`![${extra || ""}](${url})`);
        } else {
            insertAtSelection(`[${extra || selectedText || "link text"}](${url})`);
        }
        setMediaModal(null);
    };

    const discardLocalDraft = () => {
        localStorage.removeItem(DRAFT_KEY);
        setRestoreBanner(false);
    };

    const restoreLocalDraft = () => {
        const d = restoreDraftRef.current;
        if (d) {
            setTitle(d.title || "");
            setExcerpt(d.excerpt || "");
            setContent(d.content || "");
            if (d.categoryId) setCategoryId(d.categoryId);
        }
        setRestoreBanner(false);
    };

    const handleCreate = async (publish = false) => {
        if (!title.trim() || !content.trim()) {
            return showToast("error", "Title and content required");
        }
        setPublishing(publish ? "publish" : "draft");
        try {
            const postPayload = {
                title: title.trim(),
                content,
                excerpt: excerpt.trim(),
                featuredImageUrl: null,
                categoryId: categoryId || (categories[0] && categories[0].id),
                tagIds: [],
                status: publish ? "PUBLISHED" : "DRAFT",
            };

            const form = new FormData();
            form.append(
                "post",
                new Blob(
                    [JSON.stringify(postPayload)],
                    {
                        type: "application/json",
                    }
                )
            );
            if (file) form.append("file", file);

            const res = await createPost(form);
            localStorage.removeItem(DRAFT_KEY);
            showToast("success", publish ? "Post published" : "Draft saved");
            const slug = res.data?.slug || res.data?.id;
            navigate(slug ? `/blogs/${slug}` : "/profile");
        } catch (err) {
            showToast("error", err.response?.data?.message || "Unable to create post");
        } finally {
            setPublishing(null);
        }
    };

    const words = wordCount(content);
    const readingTime = Math.max(1, Math.round(words / 200));

    return (
        <div className="min-h-screen bg-white dark:bg-[#212435] text-black dark:text-white">
            {restoreBanner && (
                <div className="flex items-center justify-center gap-4 bg-sky-500 px-4 py-2.5 text-sm text-white">
                    <span>You have an unpublished draft saved on this device.</span>
                    <button
                        onClick={restoreLocalDraft}
                        className="rounded-full bg-white/15 px-3 py-1 font-medium transition-colors hover:bg-white/25"
                    >
                        Restore it
                    </button>
                    <button
                        onClick={discardLocalDraft}
                        className="rounded-full px-3 py-1 text-sky-100 transition-colors hover:text-white"
                    >
                        Discard
                    </button>
                </div>
            )}

            <header className="sticky top-0 z-40 border-b border-[#ebebeb] dark:border-white/10 bg-white/90 dark:bg-[#212435]/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-gray-500 dark:text-[#94979e]
                                   transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/10"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div className="flex items-center gap-3">
                        <span
                            className={`flex items-center gap-1 text-xs text-gray-400 dark:text-[#94979e] transition-opacity duration-300
                                        ${justSaved ? "opacity-100" : "opacity-0"}`}
                        >
                            <Check size={13} className="text-sky-500 dark:text-pink-300" />
                            Saved on this device
                        </span>
                        <button
                            onClick={() => handleCreate(false)}
                            disabled={publishing !== null}
                            className="flex items-center gap-1.5 rounded-lg border border-[#ebebeb] dark:border-white/10 px-4 py-2 text-sm
                                       font-medium transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/10 disabled:opacity-50"
                        >
                            {publishing === "draft" && <Loader2 size={14} className="animate-spin" />}
                            Save draft
                        </button>
                        <button
                            onClick={() => handleCreate(true)}
                            disabled={publishing !== null}
                            className="flex items-center gap-1.5 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium
                                       text-white transition-colors hover:bg-sky-600 disabled:opacity-50"
                        >
                            {publishing === "publish" && <Loader2 size={14} className="animate-spin" />}
                            Publish
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 py-8">
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your post a title"
                    rows={1}
                    className="w-full resize-none border-0 bg-transparent text-4xl font-semibold
                               placeholder:text-gray-300 dark:placeholder:text-[#5c5f6b] focus:outline-none"
                    style={{ fontFamily: "Fredoka, sans-serif" }}
                    onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                />

                <div className="mt-1 flex items-center gap-4 text-xs text-gray-400 dark:text-[#94979e]">
                    <span>{words} words</span>
                    <span>&middot;</span>
                    <span>{readingTime} min read</span>
                </div>

                {/* collapsible post details */}
                <div className="mt-6 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#2e3141]">
                    <button
                        onClick={() => setDetailsOpen((v) => !v)}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
                    >
                        Post details
                        <ChevronDown
                            size={16}
                            className={`text-gray-400 dark:text-[#94979e] transition-transform duration-200 ${
                                detailsOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${
                            detailsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 gap-4 border-t border-[#ebebeb] dark:border-white/10 px-4 py-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">
                                        Featured image
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {filePreviewUrl && (
                                            <img
                                                src={filePreviewUrl}
                                                alt="Featured preview"
                                                className="h-12 w-12 rounded-lg border border-[#ebebeb] dark:border-white/10 object-cover"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            className="block text-sm text-gray-500 dark:text-[#94979e]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full appearance-none rounded-lg border border-[#ebebeb] dark:border-white/10
                                                       bg-white dark:bg-[#212435] px-3 py-2 text-sm
                                                       focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100
                                                       dark:focus:border-pink-300 dark:focus:ring-pink-300/20"
                                            value={categoryId ?? ""}
                                            onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            size={14}
                                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#94979e]"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">
                                        Excerpt
                                    </label>
                                    <input
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        placeholder="A short summary readers see before opening the post"
                                        className="w-full rounded-lg border border-[#ebebeb] dark:border-white/10
                                                   bg-white dark:bg-[#212435] px-3 py-2 text-sm
                                                   focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100
                                                   dark:focus:border-pink-300 dark:focus:ring-pink-300/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* mobile write/preview toggle */}
                <div className="mt-6 flex rounded-full border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#2e3141] p-1 lg:hidden">
                    <button
                        onClick={() => setMobileView("write")}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm
                                    font-medium transition-colors duration-200 ${
                                        mobileView === "write"
                                            ? "bg-sky-500 text-white"
                                            : "text-gray-500 dark:text-[#94979e]"
                                    }`}
                    >
                        <PenLine size={14} /> Write
                    </button>
                    <button
                        onClick={() => setMobileView("preview")}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm
                                    font-medium transition-colors duration-200 ${
                                        mobileView === "preview"
                                            ? "bg-sky-500 text-white"
                                            : "text-gray-500 dark:text-[#94979e]"
                                    }`}
                    >
                        <Eye size={14} /> Preview
                    </button>
                </div>

                {/* editor + preview */}
                <div className="mt-4">
                    <EditorToolbar
                        onWrap={wrapSelection}
                        onLinePrefix={prefixCurrentLine}
                        onImage={openImageModal}
                        onLink={openLinkModal}
                        onHelp={() => setHelpOpen(true)}
                        onCaptureSelection={captureSelection}
                    />

                    <div className="mt-3 grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-[#ebebeb] dark:border-white/10 lg:grid-cols-2">
                        <div className={`bg-white dark:bg-[#212435] ${mobileView === "preview" ? "hidden lg:block" : ""}`}>
                            <textarea
                                ref={editorRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyDown={handleEditorKeyDown}
                                onSelect={(e) => {
                                    selectionRef.current = {
                                        start: e.target.selectionStart,
                                        end: e.target.selectionEnd,
                                    };
                                }}
                                placeholder="Write your post in markdown... start with a heading, like # My story"
                                className="h-[480px] w-full resize-none border-0 bg-transparent p-5 font-mono text-sm leading-relaxed
                                           placeholder:text-gray-300 dark:placeholder:text-[#5c5f6b] focus:outline-none"
                            />
                        </div>

                        <div
                            className={`h-[480px] overflow-y-auto border-t border-[#ebebeb] dark:border-white/10 bg-[#f7f7f7] dark:bg-[#2e3141] p-6
                                        lg:border-t-0 lg:border-l ${mobileView === "write" ? "hidden lg:block" : ""}`}
                        >
                            {content.trim() ? (
                                <article>
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                                </article>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-gray-400 dark:text-[#94979e]">
                                    <Eye size={22} />
                                    <p className="text-sm">Your preview appears here as you write.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <p className="mt-3 text-center text-xs text-gray-400 dark:text-[#94979e] lg:text-left">
                    New to markdown?{" "}
                    <button
                        onClick={() => setHelpOpen(true)}
                        className="text-sky-500 dark:text-pink-300 underline underline-offset-2"
                    >
                        Open the quick guide
                    </button>{" "}
                    or select text and use the toolbar above.
                </p>
            </div>

            <MarkdownHelp open={helpOpen} onClose={() => setHelpOpen(false)} />

            {mediaModal && (
                <InsertMediaModal
                    mode={mediaModal}
                    initialLabel={content.substring(selectionRef.current.start, selectionRef.current.end)}
                    onCancel={() => setMediaModal(null)}
                    onConfirm={handleMediaConfirm}
                />
            )}
        </div>
    );
}