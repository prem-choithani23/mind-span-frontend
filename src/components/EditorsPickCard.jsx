import { ImageOff } from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";
import {DEFAULT_AVATAR_ICON} from "../utils/categorySymbol.js";
import { getImageUrl } from "../utils/imageUrlUtil.js";
export default function EditorsPickCard({
                                            post,
                                            imageUrl,
                                            title,
                                            author,
                                            upperColor,
                                            slug
                                        }) {
    const resolvedPost = post || {};
    const resolvedAuthor = resolvedPost.author ?? author;
    const imageSrc = resolvedPost.featuredImageUrl ?? resolvedPost.imageUrl ?? imageUrl;
    const titleText = resolvedPost.title ?? title;
    const slugValue = resolvedPost.slug ?? slug;
    const avatarUrl = resolvedAuthor?.avatarUrl
    ? getImageUrl(resolvedAuthor.avatarUrl)
    : DEFAULT_AVATAR_ICON;

    const cardColor = resolvedPost.colors?.upper ?? upperColor;

    return (
        <div
            className="
                relative
                h-[460px]
                rounded-md
                overflow-hidden
                group
            "
            style={{backgroundColor:cardColor}}
        >
            {/* Image */}
            <img
                src={imageSrc}
                alt={titleText}
                className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                "
            />

            {/* Dark Gradient Overlay */}
            <div
                className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/20
                    to-transparent
                "
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <Link to={`/blogs/${slugValue}`}>


                    <h3
                        className="
                        text-white
                        font-semibold
                        text-[20px]
                        leading-snug
                        mb-4
                        hover:underline
                    "
                    >
                        {titleText}
                    </h3>
                </Link>


                <Link to={`/author/${resolvedAuthor?.id}`}>

                    <div className="flex items-center gap-3">
                        <img
                            src={avatarUrl}
                            alt={"author image"}
                            className="w-8 h-8 rounded-full"
                        />
                        <p className="text-white text-sm opacity-90">
                            {resolvedAuthor?.name}
                        </p>
                    </div>
                </Link>

            </div>
        </div>
    );
}
