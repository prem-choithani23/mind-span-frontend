import React from "react";
import CategoryBlogSection from "./CategoryBlogSection.jsx";
import Next from "../../../public/assets/icons/next.png";
import {getLatestBlogs , getTrendingBlogs , getBlogsByCategory} from "../../data/blogSelector.js";
import BlogCardSpread from "../../components/BlogCardSpread.jsx";
import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
export default function SliderCardGrouping({type = "latest" ,isCategory=false }){


    const blogs = (isCategory) ? getBlogsByCategory(type) : getLatestBlogs();

    const NextIcon = (
        <img className="scale-[0.7]" src={Next} alt="Next-btn" />
    );

    return (
        <div className="pt-[50px]">
            <div className="dark:text-white pb-[50px]">
                <div className="flex lg:justify-between justify-between items-center ">
                    <p className="font-bold text-[28px]">{type}</p>

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
                                dark:bg-[#f2c6de]
                                bg-[#faedcb]
                                hover:bg-[#f2c6de]
                              "
                    >
                        more {NextIcon}
                    </button>
                </div>

                <p className="text-[#94979e]">
                    Latest posts from the blog
                </p>

            </div>



            <div className="block md:hidden">
                <MultipleItemSlider>
                    {getLatestBlogs().slice(0, 3).map((blog) => (
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


            {/*Blog card display*/}
            <div
                className="
                        hidden md:grid
                        gap-5
                        grid-cols-2
                        xl:grid-cols-3
                    "
            >
                {blogs.slice(0, 3).map((blog, index) => (
                    <div
                        key={blog.id}
                        className={index === 2 ? "col-span-2 xl:col-span-1" : ""}
                    >

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
                            responsiveFeatured={index === 2}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}