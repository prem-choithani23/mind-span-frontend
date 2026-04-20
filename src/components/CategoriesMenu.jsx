import { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import CATEGORY_ICONS from "../utils/categorySymbol.js";
import {useNavigate} from "react-router";
const categories = Object.keys(CATEGORY_ICONS);


export default function CategoriesMenu({ variant = "desktop" , setSidebarOpen }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = categories.filter((c) =>
        c.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Trigger */}
            <button
                onClick={() => setOpen((p) => !p)}
                className={`
                  font-semibold
                  ${variant === "sidebar"
                    ? "py-[10px] text-[16px] font-semibold text-black dark:text-white flex justify-between items-center hover:text-sky-500 dark:hover:text-pink-300 z-100 transition cursor-pointer"
                    : "hover:text-sky-500 dark:hover:text-pink-300"}
                `}
            >
                Categories
            </button>

            {/* Menu */}
            <div
                ref={menuRef}
                className={`
                  absolute left-0 mt-3 z-50 w-[280px]
                  rounded-md shadow-xl border
                  bg-white dark:bg-[#212435]
                  border-gray-200 dark:border-[#2e3141]
                  transition-all duration-200 ease-out

                  ${open
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-[#2e3141]">
                    <p className="font-semibold dark:text-white">Categories</p>
                    <button onClick={() => setOpen(false)}>
                        <X className="w-4 h-4 dark:text-white" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-[#2e3141]">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-transparent outline-none text-sm dark:text-white"
                        />
                    </div>
                </div>

                {/* List */}
                <ul className="max-h-[220px] overflow-y-auto px-2 pb-2">
                    {filtered.map((cat) => (
                        <li
                            key={cat}
                            className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2e3141] dark:text-white"
                            onClick={() => {
                                navigate(`/blogs?category=${encodeURIComponent(cat)}`);
                                setOpen(false);
                                setSidebarOpen?.(false);
                            }}
                        >
                            {cat}
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}
