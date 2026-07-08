import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Heart, Eye, Clock } from "lucide-react";
import SidebarLatest from "../components/SidebarLatest.jsx";
import SidebarTrending from "../components/SidebarTrending.jsx";
import CommentsSection from "../components/CommentSection.jsx";
import EditorsPicksSection from "../pages/section/EditorsPicksSection.jsx";
import { getPostBySlug, getLikeStatus, likePost, getLatestPosts, getTrendingPosts } from "../api/services/postService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { pastelColorFromString, lightenHsl } from "../utils/color.js";
import { timeAgo } from "../utils/timeAgo.js";
import { getBlogCardImage } from "../utils/blogCardImage.js";
import { getImageUrl } from "../utils/imageUrlUtil.js";
import { useToast } from "../context/ToastContext.jsx";
import LikeButton from "../components/LikeButton.jsx";
import { DEFAULT_AVATAR_ICON } from "../utils/categorySymbol.js";

// The "liked" flag can come back from the API as a raw boolean, or wrapped in an
// object under a few different common key names depending on the endpoint. Reading
// it defensively avoids the classic `Boolean({ liked: false })` trap, where a
// truthy *object* makes the check always resolve to true regardless of its content.
function resolveLikedFlag(raw) {
    if (typeof raw === "boolean") return raw;
    if (raw && typeof raw === "object") {
        if (typeof raw.hasLiked === "boolean") return raw.hasLiked;
        if (typeof raw.liked === "boolean") return raw.liked;
        if (typeof raw.likedByCurrentUser === "boolean") return raw.likedByCurrentUser;
        if (typeof raw.isLiked === "boolean") return raw.isLiked;
    }
    return Boolean(raw);
}

function estimateReadingTime(markdown) {
    if (!markdown) return 1;
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

export default function BlogDetails() {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [latest, setLatest] = useState([]);
    const [trending, setTrending] = useState([]);
    const { user } = useAuth();
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const showToast = useToast();


    const handleLikeToggle = async () => {
        if (!user) {
            showToast("error", "Login to like posts.");
            return;
        }

        setLikeLoading(true);
        try {
            const { data } = await likePost(post.id);
            const serverLikeCount = typeof data?.likeCount === "number" ? data.likeCount : null;
            const serverLiked = typeof data?.hasLiked === "boolean" ? data.hasLiked : null;

            if (serverLiked !== null) {
                setLiked(serverLiked);
                setLikeCount(serverLikeCount ?? Math.max(0, likeCount + (serverLiked ? 1 : -1)));
                showToast("success", serverLiked ? "Liked" : "Unliked");
            } else {
                const newLiked = !liked;
                setLiked(newLiked);
                setLikeCount((count) => Math.max(0, count + (newLiked ? 1 : -1)));
                showToast("success", newLiked ? "Liked" : "Unliked");
            }
        } catch (e) {
            showToast("error", e.response?.data?.message || "Unable to update like.");
        } finally {
            setLikeLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);

        // load post and like info
        getPostBySlug(slug)
            .then(async (res) => {
                const p = res.data;
                setPost(p);
                setLikeCount(p.likeCount || 0);

                if (user && p.id) {
                    try {
                        const likeRes = await getLikeStatus(p.id);
                        setLiked(resolveLikedFlag(likeRes.data));
                    } catch (error) {
                        console.error("Unable to fetch like status", error);
                        setLiked(false);
                    }
                } else {
                    setLiked(false);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));

        // load side lists
        getLatestPosts(3)
            .then((res) =>
                setLatest(
                    res.data.content.map((p) => ({
                        id: p.id,
                        title: p.title,
                        date: p.publishedAt,
                        slug: p.slug,
                    }))
                )
            )
            .catch(console.error);

        getTrendingPosts(3)
            .then((res) =>
                setTrending(
                    res.data.content.map((p) => ({
                        id: p.id,
                        title: p.title,
                        imageUrl: getBlogCardImage(p),
                        upperColor: lightenHsl(pastelColorFromString(p.id.toString()), 6),
                        slug: p.slug,
                        time: timeAgo(p.publishedAt),
                    }))
                )
            )
            .catch(console.error);
    }, [slug, user]);

    if (loading) {
        return (
            <div className="pt-32 text-center text-gray-500 dark:text-gray-400">
                Loading...
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pt-32 text-center text-gray-500 dark:text-gray-400">
                Blog not found
            </div>
        );
    }

    const upperColor = lightenHsl(pastelColorFromString(post.id.toString()), 6);
    const lowerColor = pastelColorFromString(post.id.toString());
    const readingTime = estimateReadingTime(post.content);

    return (
        <div className="max-w-7xl mx-auto px-4 pt-8 lg:pt-12 overflow-x-hidden">

            {/* HERO — carries only the category chip and title. A dark scrim guarantees
                the white text stays legible no matter how light or dark the photo is. */}
            <section
                className="relative rounded-3xl overflow-hidden"
                style={!post.featuredImageUrl ? { background: `linear-gradient(180deg, ${upperColor}, ${lowerColor})` } : undefined}
            >
                <div className="relative h-[280px] sm:h-[340px] lg:h-[420px] w-full overflow-hidden">
                    {post.featuredImageUrl && (
                        <>
                            {/* blurred, scaled-up backdrop — fills any space left/right of the
                                unstretched image so there's never a hard empty edge */}

                            
                            <img
                                src={getImageUrl(post.featuredImageUrl)}
                                alt=""
                                aria-hidden="true"
                                className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-75"
                            />
                            {/* the real image, shown at its true aspect ratio — never stretched or cropped */}
                            <img
                                src={getImageUrl(post.featuredImageUrl)}
                                alt={post.title}
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                        </>
                    )}
                    {/* scrim: transparent at top, solid black toward the bottom where the title sits */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <span className="absolute left-5 top-5 lg:left-8 lg:top-8 w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur-sm">
                        {post.category?.name}
                    </span>

                    <h1 className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 max-w-3xl text-3xl font-extrabold text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* METADATA — lives on the ordinary page background so it reads correctly
                against every theme and every photo, instead of fighting the image for contrast. */}

        
            <div className="mb-16 mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2.5">
                    <img
                        src={post.author?.avatarUrl ? getImageUrl(post.author.avatarUrl) : DEFAULT_AVATAR_ICON}
                        alt={post.author?.name || "author"}
                        className="h-9 w-9 rounded-full border border-gray-200 object-cover dark:border-white/10"
                    />
                    <div className="leading-tight">
                        <p className="font-semibold text-black dark:text-white">{post.author?.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{timeAgo(post.publishedAt)}</p>
                    </div>
                </div>

                <span className="hidden h-6 w-px bg-gray-200 dark:bg-white/10 sm:block" />

                <span className="flex items-center gap-1.5">
                    <Eye size={15} className="text-gray-400 dark:text-gray-500" />
                    {post.viewCount} views
                </span>

                <span className="flex items-center gap-1.5">
                    <Clock size={15} className="text-gray-400 dark:text-gray-500" />
                    {readingTime} min read
                </span>

                <span className="flex items-center gap-1.5">
                    <Heart
                        size={15}
                        strokeWidth={2}
                        className={`transition-colors duration-300 ${
                            liked
                                ? "fill-red-500 stroke-red-500"
                                : "fill-transparent stroke-gray-400 dark:stroke-gray-500"
                        }`}
                    />
                    {likeCount} {likeCount === 1 ? "like" : "likes"}
                </span>
            </div>

            {/* CONTENT + SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-16">

                <div className="min-w-0">
                    <article className="max-w-[720px] text-[17px] leading-[1.85] text-[#2b2d31] dark:text-gray-200">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => <h1 className="text-4xl font-extrabold mt-12 mb-4">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-2xl font-bold mt-12 mb-3">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-2">{children}</h3>,
                                p: ({ children }) => <p className="mb-6">{children}</p>,
                                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
                                li: ({ children }) => <li>{children}</li>,
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 dark:text-gray-400 my-6">
                                        {children}
                                    </blockquote>
                                ),
                                code: ({ children }) => (
                                    <code className="bg-gray-100 dark:bg-[#2e3141] px-1.5 py-0.5 rounded text-sm font-mono">
                                        {children}
                                    </code>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </article>

                    {/* reaction bar — the actual like button lives here, not in the hero */}
                    <div className="flex max-w-[720px] flex-col items-center gap-3 border-y border-gray-100 dark:border-white/10 py-10 my-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enjoyed this post?</p>
                        <LikeButton liked={liked} count={likeCount} onToggle={handleLikeToggle} disabled={likeLoading} />
                    </div>
                </div>

                <aside className="hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
                    <SidebarLatest items={latest} />
                    <SidebarTrending items={trending} />
                </aside>
            </div>

            <CommentsSection key={post.id} blogId={post.id} />

            <EditorsPicksSection />

            <div className="block lg:hidden mt-20 space-y-8">
                <SidebarLatest items={latest} />
                <SidebarTrending items={trending} />
            </div>
        </div>
    );
}