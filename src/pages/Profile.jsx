import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Camera,
    Loader2,
    Lock,
    FileText,
    UserRound,
    Sparkles,
    Check,
    Eye,
    EyeOff,
    Mail,
    Pencil,
    Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { getPostsByUser, getFeaturedPosts, deletePost } from "../api/services/postService.js";
import { updateProfile, uploadAvatar } from "../api/services/userService.js";
import { resetPassword } from "../api/services/passwordService.js";
import BlogCard from "../components/BlogCard.jsx";
import { pastelColorFromString, lightenHsl } from "../utils/color.js";
import { getBlogCardImage } from "../utils/blogCardImage.js";
import { getImageUrl } from "../utils/imageUrlUtil.js";
import { DEFAULT_AVATAR_ICON, DEFAULT_CATEGORY_ICON } from "../utils/categorySymbol.js";

const PAGE_SIZE = 6;

function extractPage(resData) {
    const content = resData?.content ?? [];
    const hasMore =
        typeof resData?.last === "boolean"
            ? !resData.last
            : typeof resData?.totalPages === "number" && typeof resData?.number === "number"
            ? resData.number + 1 < resData.totalPages
            : false;
    return { content, hasMore };
}

function renderBlogCard(post) {
    const lowerColor = pastelColorFromString(post.id.toString());
    const upperColor = lightenHsl(lowerColor, 6);
    return (
        <BlogCard
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title}
            imageUrl={getBlogCardImage(post)}
            author={post.author}
            views={post.viewCount}
            category={post.category?.name}
            upperColor={upperColor}
            lowerColor={lowerColor}
        />
    );
}

/* ---------------- owner controls: wraps BlogCard without touching its internals ---------------- */

function OwnPostCard({ post, isPendingDelete, isDeleting, onAskDelete, onCancelDelete, onConfirmDelete }) {
    return (
        <div className="group relative">
            {renderBlogCard(post)}

            {!isPendingDelete && (
                <div className="pointer-events-none absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                    <Link
                        to={`/create-post?draftId=${post.id}`}
                        aria-label="Edit post"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm
                                   transition-colors hover:bg-sky-500 hover:text-white dark:bg-[#212435]/95 dark:text-gray-200
                                   dark:hover:bg-pink-300 dark:hover:text-black"
                    >
                        <Pencil size={14} />
                    </Link>
                    <button
                        onClick={() => onAskDelete(post.id)}
                        aria-label="Delete post"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm
                                   transition-colors hover:bg-red-500 hover:text-white dark:bg-[#212435]/95 dark:text-gray-200"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            )}

            {isPendingDelete && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-black/70 p-4 text-center backdrop-blur-sm">
                    <p className="text-sm font-medium text-white">Delete "{post.title}"?</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onConfirmDelete(post.id)}
                            disabled={isDeleting}
                            className="flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                        >
                            {isDeleting && <Loader2 size={12} className="animate-spin" />}
                            Delete
                        </button>
                        <button
                            onClick={onCancelDelete}
                            disabled={isDeleting}
                            className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/30"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---------------- draft row (compact, links straight to the editor) ---------------- */

function DraftRow({ post, isPendingDelete, isDeleting, onAskDelete, onCancelDelete, onConfirmDelete }) {
    if (isPendingDelete) {
        return (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10">
                <p className="text-sm text-red-600 dark:text-red-300">Delete "{post.title || "Untitled draft"}"?</p>
                <div className="flex shrink-0 gap-2">
                    <button
                        onClick={() => onConfirmDelete(post.id)}
                        disabled={isDeleting}
                        className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                    >
                        {isDeleting && <Loader2 size={12} className="animate-spin" />}
                        Delete
                    </button>
                    <button
                        onClick={onCancelDelete}
                        disabled={isDeleting}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 dark:bg-white/10 dark:text-gray-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4
                       transition-colors hover:border-sky-200 dark:border-white/10 dark:bg-[#2e3141]
                       dark:hover:border-pink-300/30"
        >
            <Link to={`/create-post?draftId=${post.id}`} className="min-w-0 flex-1">
                <p className="truncate font-semibold text-black dark:text-white">{post.title || "Untitled draft"}</p>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{post.excerpt || "No excerpt yet"}</p>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
                <Link
                    to={`/create-post?draftId=${post.id}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300"
                >
                    Continue editing
                </Link>
                <button
                    onClick={() => onAskDelete(post.id)}
                    aria-label="Delete draft"
                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}

/* ---------------- settings: edit profile ---------------- */

function EditProfileCard({ user, onSaved }) {
    const showToast = useToast();
    const { setUser } = useAuth(); // ⚠️ if your AuthContext doesn't expose setUser, this is just undefined and skipped safely
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!avatarFile) {
            setAvatarPreview(null);
            return;
        }
        const url = URL.createObjectURL(avatarFile);
        setAvatarPreview(url);

        console.log("URL : " + url)
        return () => URL.revokeObjectURL(url);
    }, [avatarFile]);

    const handleSave = async () => {
        setSaving(true);
        try {
            let latestUser = user;

            if (avatarFile) {
                const avatarRes = await uploadAvatar(avatarFile);
                latestUser = avatarRes.data;
            }

            const profileRes = await updateProfile({ name: name.trim(), bio: bio.trim() });
            latestUser = profileRes.data;

            if (typeof setUser === "function") setUser(latestUser);

            setAvatarPreview(null)
            onSaved?.(latestUser);
            setAvatarFile(null);
            showToast("success", "Profile updated.");
        } catch (e) {
            showToast("error", e.response?.data?.message || "Unable to update profile.");
        } finally {
            setSaving(false);
        }
    }



    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#2e3141]">
            <h3 className="mb-5 flex items-center gap-2 font-semibold text-black dark:text-white">
                <UserRound size={16} /> Edit profile
            </h3>

            <div className="mb-6 flex items-center gap-5">
                <div className="group relative h-20 w-20 shrink-0">
                    {avatarPreview || user?.avatarUrl ? (
                        <img
                            src={avatarPreview || getImageUrl(user.avatarUrl)}
                            alt={user?.name}
                            className="h-20 w-20 rounded-full border border-gray-200 object-cover dark:border-white/10"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-600 dark:bg-[#212435] dark:text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <label
                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full
                                   bg-black/0 text-transparent transition-all duration-200
                                   group-hover:bg-black/50 group-hover:text-white"
                    >
                        <Camera size={18} />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                        />
                    </label>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Click the photo to choose a new one from your device.
                    {avatarFile && <span className="mt-1 block text-sky-500 dark:text-pink-300">New photo selected — save to apply.</span>}
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm
                                   transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100
                                   dark:border-white/10 dark:bg-[#212435] dark:text-white dark:focus:border-pink-300 dark:focus:ring-pink-300/20"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        placeholder="A short line about yourself"
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm
                                   transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100
                                   dark:border-white/10 dark:bg-[#212435] dark:text-white dark:focus:border-pink-300 dark:focus:ring-pink-300/20"
                    />
                </div>
            </div>

            <div className="mt-5 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white
                               transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    Save changes
                </button>
            </div>
        </div>
    );
}

/* ---------------- settings: change password ---------------- */

function ChangePasswordCard({ userId }) {
    const showToast = useToast();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            showToast("error", "Fill in all password fields.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            showToast("error", "New passwords don't match.");
            return;
        }
        setSaving(true);
        try {
            await resetPassword({ userId, oldPassword, newPassword, confirmNewPassword });
            showToast("success", "Password updated.");
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (e) {
            showToast("error", e.response?.data?.message || "Unable to update password.");
        } finally {
            setSaving(false);
        }
    };

    const inputType = showPasswords ? "text" : "password";
    const inputClass =
        "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors " +
        "focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 " +
        "dark:border-white/10 dark:bg-[#212435] dark:text-white dark:focus:border-pink-300 dark:focus:ring-pink-300/20";

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#2e3141]">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold text-black dark:text-white">
                    <Lock size={16} /> Change password
                </h3>
                <button
                    onClick={() => setShowPasswords((v) => !v)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-sky-500 dark:hover:text-pink-300"
                >
                    {showPasswords ? <EyeOff size={13} /> : <Eye size={13} />}
                    {showPasswords ? "Hide" : "Show"}
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">Current password</label>
                    <input type={inputType} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">New password</label>
                    <input type={inputType} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-[#94979e]">Confirm new password</label>
                    <input type={inputType} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className={inputClass} />
                </div>
            </div>

            <div className="mt-5 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white
                               transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    Update password
                </button>
            </div>
        </div>
    );
}

/* ---------------- settings: become an author ---------------- */

function BecomeAuthorCard() {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#2e3141]">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-black dark:text-white">
                <Sparkles size={16} className="text-sky-500 dark:text-pink-300" /> Become an author
            </h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Publishing is currently limited to Author and Admin accounts. There's no self-serve upgrade yet —
                if you'd like to start writing on Mind Span, reach out to an admin and ask for your account to be
                upgraded to Author.
            </p>
            <a
                href="mailto:admin@mindspan.app?subject=Author%20access%20request"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm
                           font-medium text-black transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white
                           dark:hover:bg-white/10"
            >
                <Mail size={14} /> Request author access
            </a>
        </div>
    );
}

/* ---------------- main page ---------------- */

export default function Profile() {
    const { user: authUser } = useAuth();
    const [user, setLocalUser] = useState(authUser);
    const showToast = useToast();

    const canPublish = user?.role === "AUTHOR" || user?.role === "ADMIN";
    const [activeTab, setActiveTab] = useState(canPublish ? "posts" : "settings");

    // "your posts" pagination
    const [posts, setPosts] = useState([]);
    const [postsPage, setPostsPage] = useState(0);
    const [postsHasMore, setPostsHasMore] = useState(false);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsLoadingMore, setPostsLoadingMore] = useState(false);

    // drafts pagination
    const [drafts, setDrafts] = useState([]);
    const [draftsPage, setDraftsPage] = useState(0);
    const [draftsHasMore, setDraftsHasMore] = useState(false);
    const [draftsLoading, setDraftsLoading] = useState(true);
    const [draftsLoadingMore, setDraftsLoadingMore] = useState(false);

    const [featuredPosts, setFeaturedPosts] = useState([]);

    // shared delete state — an id is unique across a user's own posts regardless of which tab it's in
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        setLocalUser(authUser);
    }, [authUser]);

    useEffect(() => {
        if (!user?.id) return;

        getFeaturedPosts(3)
            .then((res) => setFeaturedPosts(res.data.content))
            .catch(console.error);

        loadPosts(0);
        if (canPublish) loadDrafts(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    const loadPosts = async (pageNum, append = false) => {
        append ? setPostsLoadingMore(true) : setPostsLoading(true);
        try {
            const res = await getPostsByUser(user.id, pageNum, PAGE_SIZE, "PUBLISHED");
            const { content, hasMore } = extractPage(res.data);
            setPosts((prev) => (append ? [...prev, ...content] : content));
            setPostsHasMore(hasMore);
            setPostsPage(pageNum);
        } catch (e) {
            showToast("error", "Unable to load your posts.");
        } finally {
            append ? setPostsLoadingMore(false) : setPostsLoading(false);
        }
    };

    const loadDrafts = async (pageNum, append = false) => {
        append ? setDraftsLoadingMore(true) : setDraftsLoading(true);
        try {
            const res = await getPostsByUser(user.id, pageNum, PAGE_SIZE, "DRAFT");
            const { content, hasMore } = extractPage(res.data);
            setDrafts((prev) => (append ? [...prev, ...content] : content));
            setDraftsHasMore(hasMore);
            setDraftsPage(pageNum);
        } catch (e) {
            showToast("error", "Unable to load your drafts.");
        } finally {
            append ? setDraftsLoadingMore(false) : setDraftsLoading(false);
        }
    };

    const handleConfirmDelete = async (postId) => {
        setDeletingId(postId);
        try {
            await deletePost(postId);
            setPosts((prev) => prev.filter((p) => p.id !== postId));
            setDrafts((prev) => prev.filter((p) => p.id !== postId));
            showToast("success", "Post deleted.");
        } catch (e) {
            showToast("error", e.response?.data?.message || "Unable to delete post.");
        } finally {
            setDeletingId(null);
            setPendingDeleteId(null);
        }
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-gray-500 dark:bg-[#212435] dark:text-[#94979e]">
                Loading...
            </div>
        );
    }

    const tabs = canPublish
        ? [
              { id: "posts", label: "Posts", icon: UserRound },
              { id: "drafts", label: "Drafts", icon: FileText },
              { id: "settings", label: "Settings", icon: Lock },
          ]
        : [{ id: "settings", label: "Settings", icon: Lock }];

    return (
        <div className="min-h-screen bg-white dark:bg-[#212435]">
            <div className="mx-auto max-w-5xl px-4 py-12">
                {/* USER HEADER */}
                <div className="mb-10 flex items-center gap-6">
                    {user.avatarUrl ? (
                        <img
                            src={getImageUrl(user.avatarUrl)}
                            alt={user.name}
                            className="h-20 w-20 rounded-full border border-gray-200 object-cover dark:border-white/10"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold text-gray-600 dark:bg-[#2e3141] dark:text-white">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-black dark:text-white">{user.name}</h1>
                        <p className="mt-1 text-gray-500 dark:text-[#94979e]">{user.email}</p>
                        <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:bg-[#2e3141] dark:text-gray-300">
                            {user.role}
                        </span>
                    </div>
                </div>

                {/* TABS */}
                <div className="mb-8 flex gap-1 border-b border-gray-100 dark:border-white/10">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                                    active
                                        ? "border-sky-500 text-sky-500 dark:border-pink-300 dark:text-pink-300"
                                        : "border-transparent text-gray-400 hover:text-black dark:hover:text-white"
                                }`}
                            >
                                <Icon size={15} /> {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* POSTS TAB */}
                {activeTab === "posts" && canPublish && (
                    <section className="mb-16 animate-[fadeIn_0.2s_ease-out]">
                        {postsLoading ? (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Loader2 size={15} className="animate-spin" /> Loading your posts...
                            </div>
                        ) : posts.length === 0 ? (
                            <p className="text-gray-500 dark:text-[#94979e]">You haven't published any posts yet.</p>
                        ) : (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {posts.map((post) => (
                                        <OwnPostCard
                                            key={post.id}
                                            post={post}
                                            isPendingDelete={pendingDeleteId === post.id}
                                            isDeleting={deletingId === post.id}
                                            onAskDelete={setPendingDeleteId}
                                            onCancelDelete={() => setPendingDeleteId(null)}
                                            onConfirmDelete={handleConfirmDelete}
                                        />
                                    ))}
                                </div>
                                {postsHasMore && (
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={() => loadPosts(postsPage + 1, true)}
                                            disabled={postsLoadingMore}
                                            className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2 text-sm
                                                       font-semibold transition-transform hover:scale-[1.05]
                                                       disabled:cursor-not-allowed dark:bg-[#2e3141] dark:text-white mx-auto"
                                        >
                                            {postsLoadingMore && <Loader2 size={14} className="animate-spin" />}
                                            Load more
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}

                {/* DRAFTS TAB */}
                {activeTab === "drafts" && canPublish && (
                    <section className="mb-16 animate-[fadeIn_0.2s_ease-out]">
                        {draftsLoading ? (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Loader2 size={15} className="animate-spin" /> Loading your drafts...
                            </div>
                        ) : drafts.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 py-12 text-center text-gray-400 dark:border-white/10">
                                <FileText size={22} />
                                <p className="text-sm">No drafts sitting around — nice and tidy.</p>
                                <Link to="/create-post" className="mt-1 text-sm text-sky-500 underline dark:text-pink-300">
                                    Start a new post
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3">
                                    {drafts.map((d) => (
                                        <DraftRow
                                            key={d.id}
                                            post={d}
                                            isPendingDelete={pendingDeleteId === d.id}
                                            isDeleting={deletingId === d.id}
                                            onAskDelete={setPendingDeleteId}
                                            onCancelDelete={() => setPendingDeleteId(null)}
                                            onConfirmDelete={handleConfirmDelete}
                                        />
                                    ))}
                                </div>
                                {draftsHasMore && (
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={() => loadDrafts(draftsPage + 1, true)}
                                            disabled={draftsLoadingMore}
                                            className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2 text-sm
                                                       font-semibold transition-transform hover:scale-[1.05]
                                                       disabled:cursor-not-allowed dark:bg-[#2e3141] dark:text-white mx-auto"
                                        >
                                            {draftsLoadingMore && <Loader2 size={14} className="animate-spin" />}
                                            Load more
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}

                {/* SETTINGS TAB */}
                {activeTab === "settings" && (
                    <section className="mb-16 max-w-xl space-y-6 animate-[fadeIn_0.2s_ease-out]">
                        <EditProfileCard user={user} onSaved={setLocalUser} />
                        <ChangePasswordCard userId={user.id} />
                        {!canPublish && <BecomeAuthorCard />}
                    </section>
                )}

                {/* FEATURED POSTS — always visible, independent of tabs */}
                <section>
                    <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Popular on Mind Span</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featuredPosts.map(renderBlogCard)}</div>
                </section>
            </div>
        </div>
    );
}