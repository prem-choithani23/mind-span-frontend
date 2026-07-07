import React from "react";
import {Link} from "react-router-dom";
import CATEGORY_ICONS, { DEFAULT_CATEGORY_ICON, DEFAULT_AVATAR_ICON } from "../utils/categorySymbol.js";
import { timeAgo } from "../utils/timeAgo.js";
import { getImageUrl } from "../utils/imageUrlUtil.js";
export default function BlogCardSpread({
                                           post,
                                           upperColor = "#cfe5f3",
                                           lowerColor = "#c4dced",
                                           title = "Together happy feelings continue juvenile one had",
                                           imageUrl,
                                           author = {
                                               name: "William Lewis",
                                               imageUrl: "https://i.pravatar.cc/100",
                                           },
                                           comments = 0,
                                           views = 3,
                                           category = "Lifestyle",
                                           time = "3 weeks ago",
                                           responsiveFeatured = false,
                                            slug
                                       }) {
    const resolvedPost = post || {};
    const resolvedAuthor = resolvedPost.author ?? author;
    const categoryName = resolvedPost.category?.name ?? category;
    const imageSrc = resolvedPost.featuredImageUrl ?? resolvedPost.imageUrl ?? imageUrl;
    const commentsCount = resolvedPost.commentCount ?? resolvedPost.comments ?? comments;
    const viewCount = resolvedPost.viewCount ?? views;
    const displayTime = resolvedPost.publishedAt ? timeAgo(resolvedPost.publishedAt) : time;
    const titleText = resolvedPost.title ?? title;
    const slugValue = resolvedPost.slug ?? slug;
    const topBackgroundColor = resolvedPost.colors?.upper ?? upperColor;
    const bottomBackgroundColor = resolvedPost.colors?.lower ?? lowerColor;
   const avatarUrl = resolvedAuthor?.avatarUrl
    ? getImageUrl(resolvedAuthor.avatarUrl)
    : DEFAULT_AVATAR_ICON;  
    const categoryImageUrl = CATEGORY_ICONS[categoryName] != null ? CATEGORY_ICONS[categoryName] : DEFAULT_CATEGORY_ICON;
    

    
    return (
        <div
            className={`
                relative flex flex-col
                w-full
                rounded-md overflow-hidden
                shadow-lg bg-white
                ${
                responsiveFeatured
                    ? "max-xl:h-auto xl:h-[500px]"
                    : "h-[500px] sm:h-[460px] md:h-[460px] lg:h-[500px]"
            }
            `}
        >


            {/* ================= TOP SECTION ================= */}
            <div
                className={`
                    flex flex-col flex-1
                    justify-between   /* KEY FIX */
                    p-3 sm:p-4 md:p-3 lg:p-5
                    transition-all
                    ${responsiveFeatured ? "max-xl:p-0" : ""}
                `}
                style={{ backgroundColor: topBackgroundColor }}
            >

                {/* IMAGE + ICON */}
                {imageSrc && (
                    <div
                        className={`
                            relative flex justify-center items-start
                            transition-all
                            ${
                            responsiveFeatured
                                ? "max-xl:h-[360px] xl:h-auto"
                                : ""
                        }
                        `}
                    >
                        <img
                            src={imageSrc}
                            alt=""
                            className={`
                                object-contain transition-all duration-300
                                h-[140px]
                                sm:h-[160px]
                                md:h-[180px]
                                lg:h-[200px]
                                sm:mt-10
                                sm:scale-[1.5]
                                max-sm:scale-[1.6]
                                max-sm:mt-5 
                                md:scale-[1.5]
                                
                             

                                ${
                                responsiveFeatured
                                    ? "md:scale-[1.7]"
                                    : ""
                            }
                            `}
                        />

                        {/* ICON */}
                        <div
                            style={{ backgroundColor: bottomBackgroundColor }}
                            className="
                                absolute top-2 left-2
                                w-10 h-10
                                flex items-center justify-center
                                rounded-lg text-white
                                z-10
                            "
                        >
                            <img src={categoryImageUrl} alt="category icon"/>
                        </div>
                    </div>
                )}

                {/* ================= TITLE & META ================= */}
                <div
                    className={`
                        flex flex-col justify-center
                        flex-grow   /* OCCUPIES EMPTY SPACE */
                        px-4 pt-4 pb-3
                        transition-all
                        ${responsiveFeatured ? "max-xl:px-6" : ""}
                    `}
                >

                    <Link to={`/blogs/${slugValue}`}>

                        <h3
                            className="
                            hover:underline
                            font-semibold text-[#3b3f45]
                            text-[22px]
                            max-sm:text-[30px]
                            sm:text-[24px]
                            md:text-[30px]
                            leading-tight
                            line-clamp-2
                        "
                        >
                            {titleText}
                        </h3>
                    </Link>


                    <p className="mt-2 text-[#5f6368] text-[14px]">
                        {commentsCount} Comments • 2 Min Read • {viewCount} Views
                    </p>
                </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div
                className="
                    flex items-center px-5
                    h-[72px]
                "
                style={{ backgroundColor: bottomBackgroundColor }}
            >
                <Link to={`/author/${resolvedAuthor?.id}`}>
                    <div className="flex items-center gap-3">
                        <img
                            src={avatarUrl}
                            className="w-8 h-8 rounded-full"
                            alt="author"
                        />
                        <div className="text-[15px]">
                            <p className="font-semibold text-[#3b3f45]">
                                {resolvedAuthor?.name}
                            </p>
                            <p className="text-xs text-[#6b7280]">
                                {displayTime}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
