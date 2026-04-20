import {projectName} from "../hooks/usePageTitle.js";

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 dark:border-white/10">
            <div
                className="
          max-w-7xl mx-auto
          px-4 py-6
          flex flex-col gap-4
          md:flex-row md:items-center md:justify-between
          text-sm
          text-gray-600 dark:text-gray-400
        "
            >
                {/* Left */}
                <div className="text-center md:text-left font-medium">
                    © 2025 <span className="text-gray-900 dark:text-white">{projectName}</span>
                </div>

                {/* Center Links */}
                <div className="flex justify-center gap-6">
                    <a href="/" className="hover:text-black dark:hover:text-white transition">
                        Home
                    </a>
                    <a href="/blogs" className="hover:text-black dark:hover:text-white transition">
                        Blogs
                    </a>
                    <a href="/about" className="hover:text-black dark:hover:text-white transition">
                        About
                    </a>

                </div>

                {/* Right */}
                <div className="text-center md:text-right text-xs">
                    Built with thoughts ☕
                </div>
            </div>
        </footer>
    );
}
