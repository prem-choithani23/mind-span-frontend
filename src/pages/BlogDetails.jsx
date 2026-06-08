import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SidebarLatest from "../components/SidebarLatest.jsx";
import SidebarTrending from "../components/SidebarTrending.jsx";
import CommentsSection from "../components/CommentSection.jsx";
import EditorsPicksSection from "../pages/section/EditorsPicksSection.jsx";
import { getPostBySlug } from "../api/services/postService.js";
import { getLatestPosts, getTrendingPosts } from "../api/services/postService.js";
import { pastelColorFromString, lightenHsl } from "../utils/color.js";
import { timeAgo } from "../utils/timeAgo.js";

export default function BlogDetails() {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [latest, setLatest] = useState([]);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPostBySlug(slug)
            .then((res) => setPost(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));

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
                        imageUrl: p.featuredImageUrl,
                        upperColor: lightenHsl(pastelColorFromString(p.id.toString()), 6),
                        slug: p.slug,
                        time: timeAgo(p.publishedAt),
                    }))
                )
            )
            .catch(console.error);
    }, [slug]);

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

    return (
        <div className="max-w-7xl mx-auto px-4 pt-8 lg:pt-12 overflow-x-hidden">

            {/* HERO */}
            <section
                className="relative rounded-3xl overflow-hidden mb-20 flex justify-center"
                style={{ background: `linear-gradient(180deg, ${upperColor}, ${lowerColor})` }}
            >
                <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="h-[380px] lg:h-[440px] opacity-50"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
                    <span className="text-xs font-semibold bg-white/70 text-black px-3 py-1 rounded-full w-fit mb-4">
                        {post.category?.name}
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#222] max-w-3xl">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 mt-6 flex-wrap">
                        <img
                            src={post.author?.avatarUrl}
                            alt={post.author?.name}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border border-black/10"
                        />
                        <div className="flex flex-wrap gap-3 text-sm text-[#555]">
                            <span className="font-semibold">{post.author?.name}</span>
                            <span>• {timeAgo(post.publishedAt)}</span>
                            <span>• {post.viewCount} views</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT + SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-16">

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

                <aside className="hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
                    <SidebarLatest items={latest} />
                    <SidebarTrending items={trending} />
                </aside>
            </div>

            <CommentsSection key={post.id} blogId={post.id} comments={[]} />

            <EditorsPicksSection />

            <div className="block lg:hidden mt-20 space-y-8">
                <SidebarLatest items={latest} />
                <SidebarTrending items={trending} />
            </div>
        </div>
    );
}