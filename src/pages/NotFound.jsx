import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function NotFound() {
    const { darkMode } = useTheme();

    return (
        <div
            className={`
                min-h-[calc(100vh-64px)]
                flex flex-col items-center justify-center
                px-6 text-center
                transition-colors duration-300
                ${darkMode ? "bg-[#212435] text-white" : "bg-white text-black"}
            `}
        >
            {/* 404 */}
            <h1
                className="text-[96px] sm:text-[120px] font-bold tracking-tight"
                style={{ fontFamily: "Fredoka, sans-serif" }}
            >
                404
            </h1>

            {/* Title */}
            <p className="mt-2 text-[22px] sm:text-[26px] font-semibold">
                Page not found
            </p>

            {/* Description */}
            <p className="mt-3 max-w-[480px] text-[#94979e] dark:text-gray-400">
                Sorry, the page you’re looking for doesn’t exist or may have been moved.
            </p>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
                <Link
                    to="/"
                    className="
                        px-6 py-3 rounded-lg
                        bg-sky-500 hover:bg-sky-600
                        text-white font-semibold
                        transition
                    "
                >
                    Go Home
                </Link>

                <Link
                    to="/blogs"
                    className={`
                        px-6 py-3 rounded-lg
                        font-semibold transition
                        border
                        ${
                        darkMode
                            ? "border-white/20 hover:bg-white/10"
                            : "border-black/10 hover:bg-black/5"
                    }
                    `}
                >
                    Browse Blogs
                </Link>
            </div>
        </div>
    );
}
