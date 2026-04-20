import React from "react";
import { useParams } from "react-router-dom";

import SidebarLatest from "../components/SidebarLatest.jsx";
import SidebarTrending from "../components/SidebarTrending.jsx";
import FeaturedPostCard from "../components/FeaturedPostcard.jsx";
import CommentsSection from "../components/CommentSection.jsx";
import EditorsPicksSection from "../pages/section/EditorsPicksSection.jsx";
import {
    getLatestTitles,
    getTrendingCompact,
    getBlogBySlug
} from "../data/blogSelector";
import {Link} from "react-router-dom";

export default function BlogDetails() {
    const { slug } = useParams();

    const blog = getBlogBySlug(slug)

    if (!blog) {
        return (
            <div className="pt-32 text-center text-gray-500 dark:text-gray-400">
                Blog not found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pt-8 lg:pt-12 overflow-x-hidden">

            {/* ================= HERO ================= */}
            <section
                className="relative rounded-3xl overflow-hidden mb-20 flex justify-center "
                style={{
                    background: `linear-gradient(180deg, ${blog.colors.upper}, ${blog.colors.lower})`
                }}
            >
                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="
       h-[380px] lg:h-[440px]

      opacity-50
    "
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">

                    {/* CATEGORY */}
                    <span
                        className="
        text-xs font-semibold
        bg-white/70
        text-black
        px-3 py-1 rounded-full
        w-fit mb-4
      "
                    >
      {blog.category}
    </span>

                    {/* TITLE */}
                    <h1
                        className="
        text-3xl sm:text-4xl lg:text-5xl
        font-extrabold
        text-[#222]
        max-w-3xl
      "
                    >
                        {blog.title}
                    </h1>

                    {/* AUTHOR ROW */}
                    <div className="flex items-center gap-4 mt-6 flex-wrap">

                        {/* AVATAR */}

                        <Link to={`/author/${blog.author.slug}`}>
                            <img
                                src={blog.author.imageUrl}
                                alt={blog.author.name}
                                className="
                                  w-10 h-10 lg:w-12 lg:h-12
                                  rounded-full
                                  object-cover
                                  hover:scale-[1.1]

                                  border border-black/10
                                "
                            />
                        </Link>


                        {/* META */}
                        <div className="flex flex-wrap gap-3 text-sm text-[#555] ">
                            <Link to={`/author/${blog.author.slug}`}>
                                <span className="hover:underline font-semibold">
                                  {blog.author.name}
                                </span>
                            </Link>
                            <span>• {blog.publishedAt}</span>
                            <span>• {blog.readTime} min read</span>
                            <span>• {blog.views} views</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* ================= CONTENT + SIDEBAR ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-16">

                {/* -------- ARTICLE -------- */}
                <article
                    className="
            max-w-[720px]
            text-[17px]
            leading-[1.85]
            text-[#2b2d31]
            dark:text-gray-200
          "
                >
                    <div className="space-y-10">
                        {blog.content.blocks.map((block, index) => {
                            if (block.type === "heading") {
                                return (
                                    <h2
                                        key={index}
                                        className="text-2xl font-bold mt-12"
                                    >
                                        {block.text}
                                    </h2>
                                );
                            }

                            if (block.type === "subheading") {
                                return (
                                    <h3
                                        key={index}
                                        className="text-xl font-semibold mt-8"
                                    >
                                        {block.text}
                                    </h3>
                                );
                            }

                            if (block.type === "paragraph") {
                                return (
                                    <p key={index}>
                                        {block.text}
                                    </p>
                                );
                            }

                            return null;
                        })}
                    </div>
                </article>

                {/* -------- SIDEBAR (DESKTOP) -------- */}
                <aside className="hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
                    <SidebarLatest items={getLatestTitles()} />
                    <SidebarTrending items={getTrendingCompact()} />
                </aside>
            </div>

            {/* COMMENTS */}
            <CommentsSection
                key={blog.id}
                blogId={blog.id}
                comments={[
                    {
                        author: "Prem Choithani",
                        date: "2 days ago",
                        text: "This article really changed how I think about habits."
                    },
                    {
                        author: "Mukesh Gaitonde",
                        date: "1 week ago",
                        text: "Loved the clarity and examples. More like this please!"
                    }
                ]}
            />



            {/* ================= EDITOR’S PICKS (FIXED) ================= */}
            <EditorsPicksSection/>

            {/* ================= SIDEBAR (MOBILE) ================= */}
            <div className="block lg:hidden mt-20 space-y-8">
                <SidebarLatest items={getLatestTitles()} />
                <SidebarTrending items={getTrendingCompact()} />
            </div>

        </div>
    );
}
