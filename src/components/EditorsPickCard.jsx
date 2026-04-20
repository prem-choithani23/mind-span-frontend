import React from "react";
import {Link} from "react-router-dom";
export default function EditorsPickCard({
                                            imageUrl,
                                            title,
                                            author,
                                            upperColor,
                                            slug
                                        }) {
    return (
        <div
            className="
                relative
                h-[460px]
                rounded-md
                overflow-hidden
                group
            "
            style={{backgroundColor:upperColor}}
        >
            {/* Image */}
            <img
                src={imageUrl}
                alt={title}
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
                <Link to={`/blogs/${slug}`}>


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
                        {title}
                    </h3>
                </Link>


                <Link to={`/author/${author.slug}`}>

                    <div className="flex items-center gap-3">
                        <img
                            src={author.imageUrl}
                            alt={"author image"}
                            className="w-8 h-8 rounded-full"
                        />
                        <p className="text-white text-sm opacity-90">
                            {author.name}
                        </p>
                    </div>
                </Link>

            </div>
        </div>
    );
}
