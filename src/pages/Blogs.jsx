import { useState, useEffect, useRef } from "react";
import BlogCard from "../components/BlogCard.jsx";
import { useSearchParams } from "react-router-dom";
import { pastelColorFromString, lightenHsl } from "../utils/color";
import { getAllPosts, getPostsByCategory, searchPosts } from "../api/services/postService.js";
import { getAllCategories } from "../api/services/categoryService.js";

const BLOGS_PER_PAGE = 6;

export default function Blogs() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("title");
    const [selectedCategory, setSelectedCategory] = useState(null); // category object {id, name, slug}
    const [page, setPage] = useState(0); // backend is 0-indexed

    const gridRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Fetch categories once
    useEffect(() => {
        getAllCategories()
            .then((res) => setCategories(res.data))
            .catch(console.error);
    }, []);

    // Sync category from URL params
    useEffect(() => {
        const urlCategory = searchParams.get("category");
        if (urlCategory && categories.length > 0) {
            const match = categories.find(
                (c) => c.slug === urlCategory || c.name.toLowerCase() === urlCategory.toLowerCase()
            );
            if (match) setSelectedCategory(match);
        }
    }, [searchParams, categories]);

    // Fetch posts whenever page, category, or search changes
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                let res;
                if (search.trim() && searchBy === "title") {
                    res = await searchPosts(search, page, BLOGS_PER_PAGE);
                } else if (selectedCategory) {
                    res = await getPostsByCategory(selectedCategory.id, page, BLOGS_PER_PAGE);
                } else {
                    res = await getAllPosts(page, BLOGS_PER_PAGE);
                }
                setPosts(res.data.content);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, selectedCategory, search, searchBy]);

    // Scroll to grid on page change
    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [page]);

    const handleCategoryChange = (e) => {
        const slug = e.target.value;
        setPage(0);
        if (slug === "all") {
            setSelectedCategory(null);
            searchParams.delete("category");
            setSearchParams(searchParams);
        } else {
            const match = categories.find((c) => c.slug === slug);
            setSelectedCategory(match || null);
            setSearchParams({ category: slug });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#212435] px-6 py-12">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
                    Blogs
                </h1>

                {/* SEARCH & FILTERS */}
                <div className="flex flex-wrap gap-4 mb-10 p-4 rounded-xl bg-gray-50 dark:bg-[#1b1e2b] border border-gray-200 dark:border-[#2e3141]">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                        className="w-full md:w-[260px] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2e3141] bg-white dark:bg-[#212435] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:focus:ring-pink-400/40 transition"
                    />

                    <select
                        value={searchBy}
                        onChange={(e) => { setSearchBy(e.target.value); setPage(0); }}
                        className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2e3141] bg-white dark:bg-[#212435] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:focus:ring-pink-400/40 cursor-pointer transition"
                    >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>

                    <select
                        value={selectedCategory?.slug || "all"}
                        onChange={handleCategoryChange}
                        className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2e3141] bg-white dark:bg-[#212435] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:focus:ring-pink-400/40 cursor-pointer transition"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* BLOG CARDS */}
                <div ref={gridRef} className="grid sm:grid-cols-2 auto-rows-fr lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-gray-500 col-span-3">Loading...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-gray-500 col-span-3">No blogs found.</p>
                    ) : (
                        posts.map((post) => {
                            const lowerColor = pastelColorFromString(post.id?.toString() || post.title);
                            const upperColor = lightenHsl(lowerColor, 6);
                            return (
                                <BlogCard
                                    key={post.id}
                                    id={post.id}
                                    slug={post.slug}
                                    lowerColor={lowerColor}
                                    upperColor={upperColor}
                                    title={post.title}
                                    imageUrl={post.featuredImageUrl}
                                    author={post.author}
                                    category={post.category?.name}
                                    views={post.viewCount}
                                    comments={0}
                                    responsiveFeatured={false}
                                />
                            );
                        })
                    )}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2e3141] bg-white dark:bg-[#2f3444] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#2e3141] disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Prev
                        </button>

                        {[...Array(Math.min(totalPages, 7))].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`h-10 w-10 rounded-lg border transition
                                    ${page === i
                                    ? "bg-sky-500 text-white border-sky-500 dark:bg-[#fda5d5] dark:border-pink-400 dark:text-black"
                                    : "border-gray-200 dark:border-[#2e3141] bg-white dark:bg-[#2f3444] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#2e3141]"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2e3141] bg-white dark:bg-[#2f3444] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#2e3141] disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}