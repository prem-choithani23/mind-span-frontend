import React, { useEffect, useState } from "react";
import { Trash2, Loader2, MessageCircle } from "lucide-react";
import { getCommentsByPost, createComment, deleteComment } from "../api/services/commentService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { timeAgo } from "../utils/timeAgo.js";

const PAGE_SIZE = 10;

/* ---------------- response shape helpers ----------------
   Backend response fields for comments/pagination aren't confirmed yet, so these
   read a few likely shapes defensively instead of assuming one exact contract. */

function normalizeComment(raw) {
    const ownerId = raw.commentorId ?? raw.userId ?? raw.author?.id ?? raw.user?.id ?? raw.authorId ?? null;
    const isOwnerFlag =
        typeof raw.isOwner === "boolean"
            ? raw.isOwner
            : typeof raw.canDelete === "boolean"
            ? raw.canDelete
            : null;

    return {
        id: raw.id,
        content: raw.content ?? raw.text ?? raw.body ?? "",
        authorName:
            raw.commentorName ?? raw.author?.name ?? raw.userName ?? raw.user?.name ?? raw.authorName ?? "Anonymous",
        authorAvatar:
            raw.commentorAvatarUrl ?? raw.author?.avatarUrl ?? raw.author?.imageUrl ?? raw.user?.avatarUrl ?? null,
        createdAt: raw.createdAt ?? raw.date ?? raw.postedAt ?? null,
        ownerId,
        isOwnerFlag,
    };
}

function canDeleteComment(comment, user) {
    if (!user) return false;
    if (comment.isOwnerFlag !== null) return comment.isOwnerFlag;
    if (comment.ownerId == null) return false;
    return String(comment.ownerId) === String(user.id);
}

function extractPage(resData) {
    if (Array.isArray(resData)) {
        return { items: resData, hasMore: false };
    }
    const items = resData?.content ?? [];
    const hasMore =
        typeof resData?.last === "boolean"
            ? !resData.last
            : typeof resData?.totalPages === "number" && typeof resData?.number === "number"
            ? resData.number + 1 < resData.totalPages
            : false;
    return { items, hasMore };
}

/* ---------------- single comment row ---------------- */

function CommentRow({ comment, canDelete, isPendingDelete, isDeleting, onAskDelete, onCancelDelete, onConfirmDelete }) {
    return (
        <div
            className={`flex gap-4 transition-opacity duration-300 ${isDeleting ? "opacity-40" : "opacity-100"}`}
        >
            <div className="h-9 w-9 shrink-0 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-bold">
                {comment.authorAvatar ? (
                    <img src={comment.authorAvatar} alt={comment.authorName} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                    comment.authorName[0]?.toUpperCase()
                )}
            </div>

            <div className="flex-1 rounded-xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-[#2e3141]">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold dark:text-white">{comment.authorName}</span>
                        <span className="text-xs text-gray-400">
                            {comment.createdAt ? timeAgo(comment.createdAt) : ""}
                        </span>
                    </div>

                    {canDelete && !isPendingDelete && (
                        <button
                            onClick={() => onAskDelete(comment.id)}
                            disabled={isDeleting}
                            aria-label="Delete comment"
                            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500
                                       dark:hover:bg-red-500/10 disabled:cursor-not-allowed"
                        >
                            <Trash2 size={15} />
                        </button>
                    )}
                </div>

                <p className="mt-2 whitespace-pre-wrap text-[15px] text-[#444] dark:text-gray-300">
                    {comment.content}
                </p>

                {isPendingDelete && (
                    <div className="mt-3 flex items-center gap-3 rounded-lg bg-red-50 px-3 py-2 text-xs dark:bg-red-500/10">
                        <span className="text-red-600 dark:text-red-300">Delete this comment?</span>
                        <button
                            onClick={() => onConfirmDelete(comment.id)}
                            disabled={isDeleting}
                            className="flex items-center gap-1 font-semibold text-red-600 hover:underline dark:text-red-300"
                        >
                            {isDeleting && <Loader2 size={12} className="animate-spin" />}
                            Yes, delete
                        </button>
                        <button
                            onClick={onCancelDelete}
                            disabled={isDeleting}
                            className="text-gray-500 hover:underline dark:text-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------------- main section ---------------- */

export default function CommentSection({ blogId }) {
    const { user } = useAuth();
    const showToast = useToast();

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const [newComment, setNewComment] = useState("");
    const [posting, setPosting] = useState(false);

    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const loadComments = async (pageNum, { append = false } = {}) => {
        append ? setLoadingMore(true) : setLoading(true);
        try {
            const res = await getCommentsByPost(blogId, { page: pageNum, size: PAGE_SIZE });
            const { items, hasMore: more } = extractPage(res.data);
            const normalized = items.map(normalizeComment);
            setComments((prev) => (append ? [...prev, ...normalized] : normalized));
            setHasMore(more);
            setPage(pageNum);
        } catch (e) {
            showToast("error", "Unable to load comments.");
        } finally {
            append ? setLoadingMore(false) : setLoading(false);
        }
    };

    useEffect(() => {
        loadComments(0);
        setPendingDeleteId(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogId]);

    const handlePost = async () => {
        if (!user) {
            showToast("error", "Login to comment.");
            return;
        }
        const text = newComment.trim();
        if (!text) return;

        setPosting(true);
        try {
            const res = await createComment(blogId, text, user.id);
            const created = normalizeComment(res.data);
            setComments((prev) => [created, ...prev]);
            setNewComment("");
            showToast("success", "Comment posted.");
        } catch (e) {
            showToast("error", e.response?.data?.message || "Unable to post comment.");
        } finally {
            setPosting(false);
        }
    };

    const handleConfirmDelete = async (commentId) => {
        const snapshot = comments;
        setDeletingId(commentId);
        try {
            await deleteComment(commentId, user.id);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
            showToast("success", "Comment deleted.");
        } catch (e) {
            setComments(snapshot); // nothing actually changed yet, but keeps behavior explicit if we later go optimistic
            showToast("error", e.response?.data?.message || "Unable to delete comment.");
        } finally {
            setDeletingId(null);
            setPendingDeleteId(null);
        }
    };

    return (
        <section className="mt-28 max-w-[760px]">
            <h2 className="mb-6 text-2xl font-bold dark:text-white">Comments</h2>

            {/* NEW COMMENT */}
            <div className="mb-10">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={user ? "Add a comment..." : "Login to add a comment..."}
                    className="w-full min-h-[100px] rounded-xl border border-black/10 bg-white p-4 outline-none
                               transition-colors focus:border-sky-400 dark:border-white/10 dark:bg-[#2e3141]
                               dark:text-white dark:focus:border-pink-300"
                />
                <div className="mt-3 flex justify-end">
                    <button
                        onClick={handlePost}
                        disabled={posting || !newComment.trim()}
                        className="flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white
                                   transition-transform hover:scale-[1.05] disabled:cursor-not-allowed disabled:opacity-50
                                   disabled:hover:scale-100 dark:bg-[#fda5d5] dark:text-black"
                    >
                        {posting && <Loader2 size={14} className="animate-spin" />}
                        Post Comment
                    </button>
                </div>
            </div>

            {/* COMMENTS */}
            {loading ? (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Loader2 size={15} className="animate-spin" /> Loading comments...
                </div>
            ) : comments.length === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 py-12 text-center text-gray-400 dark:border-white/10">
                    <MessageCircle size={22} />
                    <p className="text-sm">No comments yet — be the first to say something.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <CommentRow
                            key={comment.id}
                            comment={comment}
                            canDelete={canDeleteComment(comment, user)}
                            isPendingDelete={pendingDeleteId === comment.id}
                            isDeleting={deletingId === comment.id}
                            onAskDelete={setPendingDeleteId}
                            onCancelDelete={() => setPendingDeleteId(null)}
                            onConfirmDelete={handleConfirmDelete}
                        />
                    ))}
                </div>
            )}

            {/* LOAD MORE */}
            {hasMore && (
                <div className="mt-10 text-center">
                    <button
                        onClick={() => loadComments(page + 1, { append: true })}
                        disabled={loadingMore}
                        className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2 text-sm font-semibold
                                   transition-transform hover:scale-[1.05] disabled:cursor-not-allowed
                                   dark:bg-[#fda5d5] dark:text-black mx-auto"
                    >
                        {loadingMore && <Loader2 size={14} className="animate-spin" />}
                        Load more comments
                    </button>
                </div>
            )}
        </section>
    );
}