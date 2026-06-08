import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getPostsByUser, getFeaturedPosts } from "../api/services/postService.js";
import BlogCard from "../components/BlogCard.jsx";
import { pastelColorFromString, lightenHsl } from "../utils/color.js";

export default function Profile() {
    const { user } = useAuth();
    const [myPosts, setMyPosts] = useState([]);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const fetchAll = async () => {
            try {
                const [myRes, featuredRes] = await Promise.all([
                    getPostsByUser(user.id, 0, 6),
                    getFeaturedPosts(3),
                ]);
                setMyPosts(myRes.data.content);
                setFeaturedPosts(featuredRes.data.content);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [user]);

    const renderCard = (post) => {
        const lowerColor = pastelColorFromString(post.id.toString());
        const upperColor = lightenHsl(lowerColor, 6);
        return (
            <BlogCard
                key={post.id}
                id={post.id}
                slug={post.slug}
                title={post.title}
                imageUrl={post.featuredImageUrl}
                author={post.author}
                views={post.viewCount}
                category={post.category?.name}
                upperColor={upperColor}
                lowerColor={lowerColor}
            />
        );
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-[#94979e]">
            Loading...
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">

            {/* USER INFO */}
            <div className="flex items-center gap-6 mb-14">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-[#2e3141] flex items-center justify-center text-3xl font-bold text-gray-600 dark:text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">{user?.name}</h1>
                    <p className="text-gray-500 dark:text-[#94979e] mt-1">{user?.email}</p>
                    <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-[#2e3141] text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        {user?.role}
                    </span>
                </div>
            </div>

            {/* MY POSTS — only for author/admin */}
            {(user?.role === "AUTHOR" || user?.role === "ADMIN") && (
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 dark:text-white">Your Posts</h2>
                    {myPosts.length === 0 ? (
                        <p className="text-gray-500 dark:text-[#94979e]">You haven't published any posts yet.</p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {myPosts.map(renderCard)}
                        </div>
                    )}
                </section>
            )}

            {/* FEATURED POSTS */}
            <section>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Popular on Mind Span</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredPosts.map(renderCard)}
                </div>
            </section>
        </div>
    );
}