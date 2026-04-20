import React from "react";
import {Link} from "react-router-dom";
import {getTopPicks} from "../data/blogSelector.js";

export default function TopPicks({ className = "" }) {

    const topPicksData = getTopPicks();
    return (
        <div className={className}>
            <h4 className="font-bold mb-4 text-[22px] text-[#3b3f45] dark:text-white">
                Top picks
            </h4>

            <div className="flex flex-col gap-5">
                {topPicksData.map((blog, index) => (
                    <div key={index} className="flex gap-4 items-start">
                        <div
                            style={{ backgroundColor: blog.upperColor }}
                            className="w-[90px] h-[90px] rounded-md flex-shrink-0"
                        >
                            {blog.imageUrl && (
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Link to={`/blogs/${blog.slug}`}>
                                <p className="hover:underline text-[18px] font-semibold leading-snug text-[#3b3f45] dark:text-white">
                                    {blog.title}
                                </p>
                            </Link>


                            <span className="text-[13px] text-[#94979e] mt-1">
                                {blog.views} Views
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
