import React from "react";
import {Link} from "react-router-dom";
import CATEGORY_ICONS, { DEFAULT_AVATAR_ICON, DEFAULT_CATEGORY_ICON } from "../utils/categorySymbol.js";

export default function BlogCard({
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

    const categoryImageUrl = CATEGORY_ICONS[category] != null ? CATEGORY_ICONS[category] : DEFAULT_CATEGORY_ICON;

    const avatarUrl = author.imageUrl ? author.imageUrl : DEFAULT_AVATAR_ICON
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
                style={{ backgroundColor: upperColor }}
            >


            {/* Image + Icon (overlay) */}


                {imageUrl && (
                    <div
                        className={`
                            relative flex items-center justify-center
                            transition-all
                            max-sm:py-4
                            
                        `}
                    >


                    {/* Image */}
                        <img
                            src={imageUrl}
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
                            style={{ backgroundColor: lowerColor }}
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

                    <Link to={`/blogs/${slug}`}>{title}</Link>

                    </h3>


                    <p className="mt-2 text-[#6b7280] text-[14px]">
                        {comments} Comments • 2 Min Read • {views} Views
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
                style={{ backgroundColor: lowerColor }}
            >


                <Link to={`/author/${author.id}`}>

                    <div className="flex items-center gap-3">
                        <img
                            src={avatarUrl}
                            className="w-8 h-8 rounded-full"
                            alt="author"
                        />
                        <div className="text-[15px]">
                            <p className="font-semibold text-[#3b3f45]">{author.name}</p>
                            <p className="text-xs text-[#6b7280]">{time}</p>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}
