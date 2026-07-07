import React from "react";
import {Link} from "react-router-dom";
import CATEGORY_ICONS, { DEFAULT_AVATAR_ICON, DEFAULT_CATEGORY_ICON } from "../utils/categorySymbol.js";
import { timeAgo } from "../utils/timeAgo.js";
import { getImageUrl } from "../utils/imageUrlUtil.js";

export default function BlogCard({
            post,
            upperColor = "#cfe5f3",
            lowerColor = "#c4dced",
            title = "Together happy feelings continue juvenile one had",
            imageUrl,
            author = "William Lewis",
            comments = 0,
            views = 3,
            category = "Lifestyle",
            slug,
            time = "3 weeks ago",
        }) {
    const resolvedPost = post || {};
    const resolvedAuthor = resolvedPost.author ?? (typeof author === "string" ? { name: author } : author);
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
            `}
        >

        {/*/!* Vertical category *!/*/}
            {/*<div className="absolute left-[-40px] top-[70px] text-black font-bold -rotate-90 text-xs tracking-widest  opacity-90 z-20">*/}
            {/*    • {category.toUpperCase()}*/}
            {/*</div>*/}

            {/* TOP SECTION */}
            <div
                className={`
    flex flex-col flex-1   /* 👈 THIS IS THE KEY */
    p-2 sm:p-2 md:p-3 lg:p-5
    
  `}
                style={{ backgroundColor: topBackgroundColor }}
            >


            {/* Image + Icon (overlay) */}


                {imageSrc && (
                    <div
                        className={`
                            relative flex items-center justify-center
                            transition-all
                            max-sm:py-4
                            
                        `}
                    >


                    {/* Image */}
                        <img
                            src={imageSrc}
                            alt=""
                            className={`
                                transition-transform duration-300
                                object-contain
                            
                                h-[120px]
                                sm:h-[140px]
                                md:h-[180px]
                                lg:h-[200px]
                            
                                max-sm:scale-[1.15]
                                md:scale-[1.2]
                                lg:scale-[1.35]
                            
                                
                              `}
                        />





                        {/* Icon overlay */}
                        <div
                            style={{ backgroundColor: bottomBackgroundColor }}
                            className={`
                                absolute w-10 h-10 flex items-center justify-center
                                rounded-lg text-white z-10
                            
                                top-2 left-2
                            
                                
                              `}
                        >
                            <img src={categoryImageUrl} alt="category icon"/>
                        </div>

                    </div>
                )}

                {/* Title & meta */}

                <div
                    className={`
                        transition-all
                        pt-5 pl-3 pb-3 
                    
                     
                    `}
                >






                    <h3
                        className={`
                            font-semibold text-[#3b3f45]
                            transition-all hover:underline
                            line-clamp-2
                        
                            text-[18px]
                            sm:text-[20px]
                            md:text-[26px]
                            lg:text-[28px]
                        
                          
                          `}
                    >

                    <Link to={`/blogs/${slugValue}`}>{titleText}</Link>

                    </h3>


                    <p className="mt-2 text-[#6b7280] text-[14px]">
                        {commentsCount} Comments • 2 Min Read • {viewCount} Views
                    </p>

                </div>
            </div>

            {/* FOOTER */}
            <div
                className={`
                    flex items-center px-4
                    h-[68px]
                    border-t border-black/5
                  `}
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
                            <p className="font-semibold text-[#3b3f45]">{resolvedAuthor?.name}</p>
                            <p className="text-xs text-[#6b7280]">{displayTime}</p>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}
