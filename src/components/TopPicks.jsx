import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedPosts } from "../api/services/postService.js";
import { pastelColorFromString, lightenHsl } from "../utils/color.js";

export default function TopPicks({ className = "" }) {
    const [picks, setPicks] = useState([]);

    useEffect(() => {
        getFeaturedPosts(5)
            .then((res) => setPicks(res.data.content))
            .catch(console.error);
    }, []);

    return (
        <div className={className}>
            <h4 className="font-bold mb-4 text-[22px] text-[#3b3f45] dark:text-white">
                Top picks
            </h4>

            <div className="flex flex-col gap-5">
                {picks.map((post) => {
                    const upperColor = lightenHsl(pastelColorFromString(post.id.toString()), 6);
                    return (
                        <div key={post.id} className="flex gap-4 items-start">
                            <div
                                style={{ backgroundColor: upperColor }}
                                className="w-[90px] h-[90px] rounded-md flex-shrink-0"
                            >
                                {post.featuredImageUrl && (
                                    <img
                                        src={post.featuredImageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col">
                                <Link to={`/blogs/${post.slug}`}>
                                    <p className="hover:underline text-[18px] font-semibold leading-snug text-[#3b3f45] dark:text-white">
                                        {post.title}
                                    </p>
                                </Link>
                                <span className="text-[13px] text-[#94979e] mt-1">
                                    {post.viewCount} Views
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}