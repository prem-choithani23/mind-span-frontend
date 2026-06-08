import { Link, NavLink } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import Facebook from "../../public/assets/icons/facebook.png";
import Instagram from "../../public/assets/icons/instagram.png";
import Twitter from "../../public/assets/icons/twitter.png";
import SunIcon from "../../public/assets/icons/SunIcon.jsx";
import MoonIcon from "../../public/assets/icons/MoonIcon.jsx";
import MenuIcon from "../../public/assets/icons/MenuIcon.jsx";
import CategoriesMenu from "./CategoriesMenu.jsx";
import { SearchIcon } from "lucide-react";
import { projectName } from "../hooks/usePageTitle.js";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { darkMode, toggleDarkMode } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const title = projectName;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate("/login", { replace: true });
    };

    const navLinkClass = ({ isActive }) =>
        `transition ${isActive
            ? "text-sky-500 dark:text-pink-300 font-semibold"
            : "text-black dark:text-white hover:text-sky-500 font-semibold dark:hover:text-pink-300"
        }`;

    const sidebarNavClass = "py-[10px] text-[16px] font-semibold text-black dark:text-white flex justify-between items-center hover:text-sky-500 dark:hover:text-pink-300 z-100 transition cursor-pointer";

    return (
        <>
            <nav className={`sticky top-0 z-[1000] h-16 flex items-center p-[15px] transition-colors ${scrolled ? "bg-[#f7f7f7] dark:bg-[#2e3141] shadow-md" : "bg-white dark:bg-[#212435]"} text-black dark:text-white`}>

                {sidebarOpen && (
                    <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 z-40" />
                )}

                {/* SIDEBAR */}
                <div className={`fixed top-0 left-0 h-full w-[400px] bg-white dark:bg-[#212435] text-black dark:text-white z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex items-center justify-between h-[60px] py-[12px] px-[30px] mb-[30px] border-b border-[#ebebeb] dark:border-white/10">
                        <Link to="/"><span className="text-[34px] font-semibold text-black dark:text-white">{title}</span></Link>
                    </div>

                    <div className="py-[12px] px-[30px] text-lg font-medium">
                        <div className={sidebarNavClass}>
                            <NavLink className={navLinkClass} to="/"><span onClick={() => setSidebarOpen(false)}>Home</span></NavLink>
                        </div>
                        <CategoriesMenu variant="sidebar" setSidebarOpen={setSidebarOpen} />
                        <div className={sidebarNavClass}>
                            <NavLink className={navLinkClass} to="/blogs"><span onClick={() => setSidebarOpen(false)}>Blogs</span></NavLink>
                        </div>
                        <div className={sidebarNavClass}>
                            <NavLink className={navLinkClass} to="/about"><span onClick={() => setSidebarOpen(false)}>About</span></NavLink>
                        </div>

                        {/* Auth links in sidebar */}
                        {user ? (
                            <>
                                <div className={sidebarNavClass}>
                                    <NavLink className={navLinkClass} to="/profile"><span onClick={() => setSidebarOpen(false)}>Profile</span></NavLink>
                                </div>
                                <div className={sidebarNavClass}>
                                    <button onClick={() => { handleLogout(); setSidebarOpen(false); }} className="text-red-500 font-semibold hover:text-red-600 transition">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={sidebarNavClass}>
                                <NavLink className={navLinkClass} to="/login"><span onClick={() => setSidebarOpen(false)}>Login</span></NavLink>
                            </div>
                        )}
                    </div>

                    <div className="px-[30px] pt-6">
                        <p className="text-[22px] font-semibold mb-3 text-black dark:text-white">follow us</p>
                        <div className="flex gap-3">
                            <Link to="https://www.twitter.com"><img src={Twitter} alt="Twitter" className="w-[40px] h-[40px] lg:w-[36px] lg:h-[36px] hover:scale-[1.1] transition cursor-pointer" /></Link>
                            <Link to="https://www.facebook.com"><img src={Facebook} alt="Facebook" className="w-[40px] h-[40px] lg:w-[36px] lg:h-[36px] hover:scale-[1.1] transition cursor-pointer" /></Link>
                            <Link to="https://www.instagram.com"><img src={Instagram} alt="Instagram" className="w-[40px] h-[40px] lg:w-[36px] lg:h-[36px] hover:scale-[1.1] transition cursor-pointer" /></Link>
                        </div>
                    </div>
                </div>

                {/* LEFT */}
                <div className="flex-1 flex items-center gap-2">
                    <div onClick={() => setSidebarOpen(true)} className={`h-10 w-10 rounded-full flex items-center justify-center hover:scale-[1.1] transition cursor-pointer ${darkMode ? "bg-[#2e3141]" : "bg-[#f5f5f5]"} flex min-lg:hidden`}>
                        <MenuIcon className={`h-5 w-5 ${darkMode ? "text-white" : "text-black"}`} />
                    </div>
                    <Link to="/">
                        <span className="lg:hidden hover:cursor-pointer text-[20px] md:text-[28px] font-semibold tracking-wide" style={{ fontFamily: "Fredoka, sans-serif" }}>
                            {title}
                        </span>
                    </Link>
                    <div className="flex gap-3 max-xl:hidden">
                        <Link to="https://www.twitter.com"><img src={Twitter} alt="Twitter" className="w-[40px] h-[40px] lg:w-[36px] lg:h-[36px] hover:scale-[1.1] transition cursor-pointer" /></Link>
                        <Link to="https://www.facebook.com"><img src={Facebook} alt="Facebook" className="w-[40px] h-[40px] lg:w-[36px] lg:h-[36px] hover:scale-[1.1] transition cursor-pointer" /></Link>
                        <Link to="https://www.instagram.com"><img src={Instagram} alt="Instagram" className="w-[40px] h-[40px] lg:w-[36px] lg:h-[36px] hover:scale-[1.1] transition cursor-pointer" /></Link>
                    </div>
                </div>

                {/* DESKTOP CENTER */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <CategoriesMenu />
                    <Link to="/"><span className="text-[40px] hover:cursor-pointer font-semibold tracking-wide">{title}</span></Link>
                    <NavLink to="/about" className={navLinkClass}>About</NavLink>
                    <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex justify-end gap-3 items-center">
                    <button
                        onClick={toggleDarkMode}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 ${darkMode ? scrolled ? "bg-[#212435]" : "bg-[#2e3141]" : scrolled ? "bg-white" : "bg-[#f5f5f5]"}`}
                    >
                        {darkMode ? <SunIcon className="h-5 w-5 text-white" /> : <MoonIcon className="h-5 w-5 text-black" />}
                    </button>

                    <button className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 ${darkMode ? scrolled ? "bg-[#212435]" : "bg-[#2e3141]" : scrolled ? "bg-white" : "bg-[#f5f5f5]"}`}>
                        <SearchIcon className={`h-5 w-5 ${darkMode ? "text-white" : "text-black"}`} />
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen((p) => !p)}
                                className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm hover:bg-sky-600 transition"
                            >
                                {user.name?.charAt(0).toUpperCase()}
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2e3141] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                                        <p className="text-sm font-semibold text-black dark:text-white truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-[#94979e] truncate">{user.email}</p>
                                        <span className="text-xs font-medium text-sky-500 dark:text-pink-300 uppercase">{user.role}</span>
                                    </div>
                                    <Link
                                        to="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#212435] transition"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-[#212435] transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition text-white text-sm font-semibold">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;