import React from "react";
import Avatar from "../../public/assets/avatars/william.jpg";
import {Link} from "react-router-dom";

export default function HeroBlog({ heroBlog }) {
    const upperColor = heroBlog?.colors?.upper; // e.g. "hsl(210, 45%, 76%)"

    return (
        <div
            className="
                relative
                mx-auto
                overflow-hidden
                rounded-lg
                w-[90%] h-[328px]
                lg:w-[800px] lg:h-[360px]
                xl:w-full xl:h-[456px]
                bg-no-repeat
                bg-contain
                bg-[position:50%_20%]
            "
            style={{
                backgroundImage: `url(${heroBlog.imageUrl})`,
                backgroundColor: upperColor,
            }}
        >
            {/* ===== GRADIENT (TAILWIND, DYNAMIC COLOR, WORKING) ===== */}
            {upperColor && (
                <div
                    className="
                        absolute inset-0 pointer-events-none
                        bg-gradient-to-t
                        from-[color:var(--upper)]/50
                        via-[color:var(--upper)]/80
                        to-[color:var(--upper)]/200
                    "
                    style={{
                        "--upper": upperColor,
                    }}
                />
            )}

            {/* ===== CONTENT ===== */}
            <div
                className="
                    relative z-10
                    h-full
                    flex flex-col justify-end
                    px-6 pb-6
                    text-white
                "
            >
                <div className="flex items-center gap-3 mb-4 text-sm text-[#3b3f45] opacity-90">

                    <Link to={`/author/${heroBlog.author.slug}`}>
                        <img
                            src={heroBlog.author.imageUrl}
                            className="w-8 h-8 rounded-full hover:scale-[1.1]"
                            alt="author"
                        />
                    </Link>

                    <div>
                        <Link to={`/author/${heroBlog.author.slug}`}>
                            <p className="hover:underline font-semibold">
                                {heroBlog.author.name}
                            </p>
                        </Link>
                        <p className="text-xs opacity-75">
                            {heroBlog.publishedAt}
                        </p>
                    </div>
                </div>

                <Link to={`/blogs/${heroBlog.slug}`}>
                    <h1 className="hover:underline hover:cursor-pointer text-2xl text-[#3b3f45] lg:text-3xl xl:text-4xl font-bold leading-tight max-w-[90%]">
                        {heroBlog.title}
                    </h1>
                </Link>


                <p className="mt-3 text-[#3b3f45] text-sm opacity-80">
                    {heroBlog.comments} Comments •{" "}
                    {heroBlog.readTime} Min Read •{" "}
                    {heroBlog.views} Views
                </p>

                <p className="mt-3 text-sm text-[#3b3f45] opacity-90 max-w-[90%]">
                    {heroBlog.excerpt ??
                        "Together happy feelings continue juvenile had off one..."}
                </p>
            </div>
        </div>
    );
}
