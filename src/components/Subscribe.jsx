import React from "react";

export default function Subscribe({ className = "" }) {
    return (
        <div
            className={`
                bg-[#f5f5f5]
                dark:bg-[#2e3141]
                rounded-xl
                p-6
                transition-colors
                ${className}
            `}
        >
            <h3 className="font-bold text-[22px] text-[#3b3f45] dark:text-white">
                Subscribe for more updates
            </h3>

            <p className="text-[#94979e] dark:text-[#92949c] text-sm mt-2">
                Do listening am eagerness oh objection collected
            </p>

            <input
                placeholder="Your email address"
                className="
                    w-full mt-4 px-4 py-3 rounded-full
                    outline-none border
                    bg-white dark:bg-[#212435]
                    text-black dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    border-gray-300 dark:border-[#3a3d4f]
                    transition-colors
                "
            />

            <button
                className="
                    w-full mt-4 py-3 rounded-full
                    bg-[#faedcb] dark:bg-[#f2c6de]
                    font-semibold text-[#3b3f45]
                    hover:bg-[#f2c6de]
                    hover:scale-[1.03]
                    transition-all
                    flex items-center justify-center gap-2
                "
            >
                <i className="fa-solid fa-paper-plane"></i>
                subscribe
            </button>
        </div>
    );
}
