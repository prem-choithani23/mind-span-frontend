import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({ liked, count, onToggle, disabled }) {
    const [pop, setPop] = useState(false);

    useEffect(() => {
        if (!pop) return;
        const t = setTimeout(() => setPop(false), 280);
        return () => clearTimeout(t);
    }, [pop]);

    const handleClick = () => {
        if (disabled) return;
        setPop(true);
        onToggle();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            aria-pressed={liked}
            aria-label={liked ? "Unlike post" : "Like post"}
            className="group inline-flex items-center gap-2.5 rounded-full border border-gray-200 dark:border-white/10
                       bg-white dark:bg-[#2e3141] px-5 py-2.5 transition-colors duration-200
                       hover:border-red-200 dark:hover:border-red-400/40
                       focus:outline-none focus:ring-2 focus:ring-red-300
                       disabled:cursor-not-allowed disabled:opacity-60"
        >
            <Heart
                size={22}
                strokeWidth={2}
                className={`transition-all duration-300 ease-out ${pop ? "scale-[1.3]" : "scale-100"} ${
                    liked
                        ? "fill-red-500 stroke-red-500"
                        : "fill-white dark:fill-[#2e3141] stroke-black dark:stroke-white group-hover:stroke-red-400"
                }`}
            />
            <span className="text-sm font-semibold text-black dark:text-white">
                {count} {count === 1 ? "like" : "likes"}
            </span>
        </button>
    );
}