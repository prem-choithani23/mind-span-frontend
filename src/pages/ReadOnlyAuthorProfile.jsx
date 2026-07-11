import { useEffect, useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { getPostsByUser } from "../api/services/postService.js";
import { getPublicProfile } from "../api/services/userService.js"; // needs the addition shown separately
import { getImageUrl } from "../utils/imageUrlUtil.js";
import { pastelColorFromString, lightenHsl } from "../utils/color.js";
import { getBlogCardImage } from "../utils/blogCardImage.js";
import BlogCard from "../components/BlogCard.jsx";

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

/**
 * Read-only public view of an author's profile.
 * No edit controls, no drafts, no settings — just who they are and what
 * they've published, paginated the same way the owner's own Profile page does.
 */
export default function ReadOnlyAuthorProfile({ authorId }) {
    const [author, setAuthor] = useState(null);
    const [authorLoading, setAuthorLoading] = useState(true);
    const [authorError, setAuthorError] = useState(false);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [postsLoading, setPostsLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        setAuthorLoading(true);
        setAuthorError(false);
        getPublicProfile(authorId)
            .then((res) => setAuthor(res.data))
            .catch(() => setAuthorError(true))
            .finally(() => setAuthorLoading(false));

        loadPosts(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorId]);

    const loadPosts = async (pageNum, append = false) => {
        append ? setLoadingMore(true) : setPostsLoading(true);
        try {
            const res = await getPostsByUser(authorId, pageNum, PAGE_SIZE, "PUBLISHED");
            const { content, hasMore: more } = extractPage(res.data);
            setPosts((prev) => (append ? [...prev, ...content] : content));
            setHasMore(more);
            setPage(pageNum);
        } catch (e) {
            console.error(e);
        } finally {
            append ? setLoadingMore(false) : setPostsLoading(false);
        }
    };

    if (authorLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-gray-500 dark:bg-[#212435] dark:text-[#94979e]">
                <Loader2 size={18} className="animate-spin" />
            </div>
        );
    }

    if (authorError || !author) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white text-center dark:bg-[#212435]">
                <p className="text-lg font-semibold text-black dark:text-white">Author not found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    This profile doesn't exist or is no longer available.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#212435]">
            <div className="mx-auto max-w-5xl px-4 py-12">
                {/* AUTHOR HEADER — no edit affordances, purely informational */}
                <div className="mb-10 flex items-center gap-6">
                    {author.avatarUrl ? (
                        <img
                            src={getImageUrl(author.avatarUrl)}
                            alt={author.name}
                            className="h-20 w-20 rounded-full border border-gray-200 object-cover dark:border-white/10"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold text-gray-600 dark:bg-[#2e3141] dark:text-white">
                            {author.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-black dark:text-white">{author.name}</h1>
                        {author.bio && (
                            <p className="mt-1 max-w-md text-gray-500 dark:text-[#94979e]">{author.bio}</p>
                        )}
                        <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:bg-[#2e3141] dark:text-gray-300">
                            {author.role}
                        </span>
                    </div>
                </div>

                {/* PUBLISHED POSTS */}
                <section>
                    <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                        Posts by {author.name}
                    </h2>

                    {postsLoading ? (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Loader2 size={15} className="animate-spin" /> Loading posts...
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 py-12 text-center text-gray-400 dark:border-white/10">
                            <FileText size={22} />
                            <p className="text-sm">{author.name} hasn't published anything yet.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map(renderBlogCard)}
                            </div>
                            {hasMore && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={() => loadPosts(page + 1, true)}
                                        disabled={loadingMore}
                                        className="mx-auto flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2 text-sm
                                                   font-semibold transition-transform hover:scale-[1.05]
                                                   disabled:cursor-not-allowed dark:bg-[#2e3141] dark:text-white"
                                    >
                                        {loadingMore && <Loader2 size={14} className="animate-spin" />}
                                        Load more
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}