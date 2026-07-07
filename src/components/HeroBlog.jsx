import React from "react";
import { Link } from "react-router-dom";
import { pastelColorFromString, lightenHsl } from "../utils/color.js";
import { timeAgo } from "../utils/timeAgo.js";

export default function HeroBlog({ heroBlog }) {
    const upperColor = lightenHsl(pastelColorFromString(heroBlog.id.toString()), 6);

    return (
        <div>
            {/* IMAGE — title only, protected by a scrim so it reads on any photo.
                A blurred, scaled copy of the same image fills the sides if the real
                image doesn't match the box's aspect ratio, instead of stretching it. */}
            <div
                className="relative mx-auto overflow-hidden rounded-lg w-[90%] h-[328px] lg:w-[800px] lg:h-[360px] xl:w-full xl:h-[456px]"
                style={{ backgroundColor: upperColor }}
            >
                {heroBlog.featuredImageUrl && (
                    <>
                        <img
                            src={heroBlog.featuredImageUrl}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-75"
                        />
                        <img
                            src={heroBlog.featuredImageUrl}
                            alt={heroBlog.title}
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                    </>
                )}

                {/* scrim: transparent at top, solid toward the bottom where the title sits */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-6">
                    <Link to={`/blogs/${heroBlog.slug}`}>
                        <h1 className="max-w-[90%] text-2xl font-bold leading-tight text-white drop-shadow-sm hover:cursor-pointer hover:underline lg:text-3xl xl:text-4xl">
                            {heroBlog.title}
                        </h1>
                    </Link>
                </div>
            </div>

            {/* METADATA — lives on the page background, always readable regardless of theme or photo */}
            <div className="mx-auto mt-4 w-[90%] lg:w-[800px] xl:w-full">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <img
                        src={heroBlog.author?.avatarUrl || "/assets/icons/default-profile.svg"}
                        className="h-9 w-9 rounded-full border border-gray-200 object-cover transition-transform hover:scale-[1.1] dark:border-white/10"
                        alt={heroBlog.author?.name || "author"}
                    />
                    <div>
                        <p className="font-semibold text-black dark:text-white">{heroBlog.author?.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{timeAgo(heroBlog.publishedAt)}</p>
                    </div>
                    <span className="mx-1 h-4 w-px bg-gray-200 dark:bg-white/10" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">{heroBlog.viewCount} views</span>
                </div>

                {heroBlog.excerpt && (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        {heroBlog.excerpt}
                    </p>
                )}
            </div>
        </div>
    );
}