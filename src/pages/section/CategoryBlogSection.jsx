import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import BlogCardSpread from "../../components/BlogCardSpread.jsx";
import Subscribe from "../../components/Subscribe.jsx";
import TopPicks from "../../components/TopPicks.jsx";
import {getBlogsByCategory} from "../../data/blogSelector.js";
import Next from "../../../public/assets/icons/next.png";
import React from "react";
export default function CategoryBlogSection({
                                                category,                 // "Art & Design"
                                                title,                    // Heading text
                                                subtitle,                 // Sub heading text
                                                showSidebar = true,       // Optional: enable/disable sidebar
                                                showMoreButton = true,    // Optional
                                            }) {
    const blogs = getBlogsByCategory(category).slice(0,4);

    const NextIcon = (
        <img className="scale-[0.7]" src={Next} alt="Next-btn" />
    );

    return (
        <div className="pt-[50px]">

            {/* ================= HEADER ================= */}
            <div className="dark:text-white pb-[50px]">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-[28px]">
                        {title || category}
                    </p>

                    {showMoreButton && (
                        <button
                            className="
                                w-[64px]
                                pl-[10px]
                                max-md:hidden
                                font-bold
                                hover:cursor-pointer
                                hover:scale-[1.1]
                                transition-all
                                justify-center
                                h-[25px]
                                rounded-xl
                                text-[#44464b]
                                flex
                                bg-[#faedcb]
                                hover:bg-[#f2c6de]
                                dark:bg-[#f2c6de]
                            "
                        >
                            more {NextIcon}
                        </button>
                    )}
                </div>

                {subtitle && (
                    <p className="text-[#94979e]">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* ================= MOBILE : SLIDER ================= */}
            <div className="md:hidden">
                <MultipleItemSlider>
                    {blogs.map((blog) => (

                        <BlogCardSpread
                            id={blog.id}
                            key={blog.id}
                            slug={blog.slug}

                            upperColor={blog.colors.upper}
                            lowerColor={blog.colors.lower}
                            author={blog.author}
                            category={blog.category}
                            comments={blog.comments}
                            views={blog.views}
                            time={blog.publishedAt}
                            title={blog.title}
                            imageUrl={blog.imageUrl}
                        />
                    ))}
                </MultipleItemSlider>
            </div>

            {/* ================= DESKTOP : GRID ================= */}
            <div className="hidden md:flex flex-col xl:flex-row gap-6">

                {/* LEFT : BLOG LIST */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row flex-wrap gap-5">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="w-full md:w-[calc(50%-10px)]"
                            >
                                <BlogCardSpread
                                    key={blog.id}
                                    id={blog.id}
                                    slug={blog.slug}
                                    upperColor={blog.colors.upper}
                                    lowerColor={blog.colors.lower}
                                    author={blog.author}
                                    category={blog.category}
                                    comments={blog.comments}
                                    views={blog.views}
                                    time={blog.publishedAt}
                                    title={blog.title}
                                    imageUrl={blog.imageUrl}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT : SIDEBAR (DESKTOP ONLY) */}
                {showSidebar && (
                    <div className="hidden xl:flex w-[340px] flex-col gap-6">
                        <Subscribe />
                        <TopPicks />
                    </div>
                )}
            </div>

            {/* ================= MOBILE : SIDEBAR ================= */}
            {showSidebar && (
                <div className="xl:hidden mt-10">
                    <Subscribe className="mb-10" />
                    <TopPicks />
                </div>
            )}
        </div>
    );
}
