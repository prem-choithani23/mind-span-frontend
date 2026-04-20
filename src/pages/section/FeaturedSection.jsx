import React from "react"
import {getTrendingCompact ,  getLatestTitles} from "../../data/blogSelector.js";
import {getFeaturedBlogs} from "../../data/blogSelector.js";
import SidebarLatest from "../../components/SidebarLatest.jsx";
import SidebarTrending from "../../components/SidebarTrending.jsx";
import FeaturedPostCard from "../../components/FeaturedPostcard.jsx";

export default function FeaturedSection() {


    const featuredBlogs = getFeaturedBlogs().slice(0,2);

    return (
        <div className="pt-[50px]">
            {/* Heading */}
            <div className="dark:text-white pb-[50px]">
                <div className="flex flex-col">
                    <p className="font-bold text-[28px]">
                        Art & Design
                    </p>
                    <p className="text-[#94979e]">
                        Am eagerness oh objection collected
                    </p>
                </div>
            </div>

            <div className="max-w-7xl ">


                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

                    {/* LEFT SIDEBAR (hidden on small) */}
                    <div className="hidden lg:block">
                        <SidebarLatest items={getLatestTitles()} />
                        <SidebarTrending items={getTrendingCompact()} />

                    </div>

                    {/* MAIN CONTENT */}
                    <div className="flex flex-col gap-8">
                        {featuredBlogs.map((blog) => (
                            <FeaturedPostCard
                                key={blog.id}
                                slug={blog.slug}
                                id={blog.id}
                                upperColor={blog.colors.upper}
                                imageUrl={blog.imageUrl}
                                title={blog.title}
                                author={blog.author}
                                comments={blog.comments}
                                minRead={blog.readTime}
                                views={blog.views}
                            />
                        ))}


                        {/* Sidebar appears BELOW on small */}
                        <div className="block lg:hidden">
                            <SidebarLatest items={getLatestTitles()} />
                            <SidebarTrending items={getTrendingCompact()} />

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}