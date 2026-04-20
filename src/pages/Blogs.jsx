import { useState,useEffect,  useMemo , useRef } from "react";
import { getAllBlogs } from "../data/blogSelector.js";
import BlogCard from "../components/BlogCard.jsx";
import {useSearchParams} from "react-router-dom"
import { lightenHsl , pastelColorFromString} from "../utils/color";
import CATEGORY_ICONS from "../utils/categorySymbol.js";
const BLOGS_PER_PAGE = 6;


export default function Blogs() {

    const blogs = getAllBlogs();

    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("title");
    const [category, setCategory] = useState("all");
    const [page, setPage] = useState(1);
    const gridRef = useRef(null)
    const [searchParams , setSearchParams] = useSearchParams();

    const categories = useMemo(
        () => Object.keys(CATEGORY_ICONS),
        []
    );


    useEffect(() => {
        const urlCategory = searchParams.get("category");

        if (urlCategory) {
            setCategory(urlCategory);
            setSearchBy("category");
            setSearch("");   // 🔥 important
            setPage(1);
        }
    }, [searchParams]);


    useEffect(()=>{
        if(gridRef.current){
            gridRef.current.scrollIntoView({behavior: "smooth" , block: "start"});
        }
    } ,[page])

    // 🔍 FILTER + SEARCH
    const filteredBlogs = useMemo(() => {
        let result = blogs;



        // Category filter
        if (category !== "all") {
            result = result.filter(
                (blog) =>
                    blog.category?.toLowerCase() === category.toLowerCase()
            );
        }

        // Search filter
        if (search.trim()) {
            const q = search.toLowerCase();

            result = result.filter((blog) => {
                if (searchBy === "title") {
                    return blog.title?.toLowerCase().includes(q);
                }

                if (searchBy === "author") {
                    // handle both string & object author
                    if (typeof blog.author === "string") {
                        return blog.author.toLowerCase().includes(q);
                    }
                    if (typeof blog.author === "object") {
                        return blog.author.name?.toLowerCase().includes(q);
                    }
                    return false;
                }

                if (searchBy === "category") {
                    return blog.category?.toLowerCase().includes(q);
                }

                return false;
            });
        }


        return result;
    }, [search, searchBy, category]);

    // 📄 PAGINATION
    const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

    const visibleBlogs = filteredBlogs.slice(
        (page - 1) * BLOGS_PER_PAGE,
        page * BLOGS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-white dark:bg-[#212435] px-6 py-12">
            <div className="max-w-7xl mx-auto">

                {/* PAGE TITLE */}
                <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
                    Blogs
                </h1>

                {/* SEARCH & FILTERS */}
                <div className="
        flex flex-wrap gap-4 mb-10
        p-4 rounded-xl
        bg-gray-50 dark:bg-[#1b1e2b]
        border border-gray-200 dark:border-[#2e3141]
    ">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="
                            w-full md:w-[260px]
                            px-4 py-2.5
                            rounded-lg
                            border border-gray-200 dark:border-[#2e3141]
                            bg-white dark:bg-[#212435]
                            text-black dark:text-white
                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                            focus:outline-none focus:ring-2
                            focus:ring-sky-400/40 dark:focus:ring-pink-400/40
                            transition
                        "
                    />


                    <select
                        value={searchBy}
                        onChange={(e) => {
                            setSearchBy(e.target.value);
                            setPage(1);
                        }}
                        className="
                            px-4 py-2.5
                            rounded-lg
                            border border-gray-200 dark:border-[#2e3141]
                            bg-white dark:bg-[#212435]
                            text-black dark:text-white
                            focus:outline-none focus:ring-2
                            focus:ring-sky-400/40 dark:focus:ring-pink-400/40
                            cursor-pointer
                            transition
                          "
                    >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="category">Category</option>
                    </select>


                    <select
                        value={category}
                        onChange={(e) => {
                            const value = e.target.value;
                            setCategory(value);
                            setPage(1);

                            if (value === "all") {
                                searchParams.delete("category");
                                setSearchParams(searchParams);
                            } else {
                                setSearchParams({ category: value });
                            }
                        }}
                        className="
                            px-4 py-2.5
                            rounded-lg
                            border border-gray-200 dark:border-[#2e3141]
                            bg-white dark:bg-[#212435]
                            text-black dark:text-white
                            focus:outline-none focus:ring-2
                            focus:ring-sky-400/40 dark:focus:ring-pink-400/40
                            cursor-pointer
                            transition
                          "
                    >
                        <option value="all">All Categories</option>

                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>


                </div>

                {/* BLOG CARDS */}
                <div ref={gridRef} className="grid sm:grid-cols-2 auto-rows-fr lg:grid-cols-3 gap-6">
                    {visibleBlogs.map((blog) => {
                        const lowerColor = pastelColorFromString(
                            blog.id?.toString() || blog.title
                        );
                        const upperColor = lightenHsl(lowerColor, 6);

                        return (
                            <BlogCard
                                id={blog.id}
                                slug={blog.slug}
                                key={blog.id}
                                lowerColor={blog.colors.lower}
                                upperColor={blog.colors.upper}
                                title={blog.title}
                                imageUrl={blog.imageUrl}
                                author={blog.author}
                                category={blog.category}
                                time={blog.time}
                                comments={blog.comments}
                                views={blog.views}
                                responsiveFeatured={false}
                            />
                        );
                    })}


                    {visibleBlogs.length === 0 && (
                        <p className="text-gray-500">
                            No blogs found.
                        </p>
                    )}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="
            px-4 py-2 rounded-lg
            border border-gray-200 dark:border-[#2e3141]
            bg-white dark:bg-[#2f3444]
            text-black dark:text-white
            hover:bg-gray-100 dark:hover:bg-[#2e3141]
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
        "
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`
                h-10 w-10 rounded-lg
                border
                ${
                                    page === i + 1
                                        ? "bg-sky-500 text-white border-sky-500 dark:bg-[#fda5d5] dark:border-pink-400 dark:text-black"   
                                        : "border-gray-200 dark:border-[#2e3141] bg-white dark:bg-[#2f3444] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#2e3141]"
                                }
                transition
            `}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="
            px-4 py-2 rounded-lg
            border border-gray-200 dark:border-[#2e3141]
            bg-white dark:bg-[#2f3444]
            text-black dark:text-white
            hover:bg-gray-100 dark:hover:bg-[#2e3141]
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
        "
                        >
                            Next
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
}
