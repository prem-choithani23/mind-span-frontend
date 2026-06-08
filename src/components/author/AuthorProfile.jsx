import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUser } from "../../api/services/postService.js";
import BlogCard from "../BlogCard.jsx";
import { pastelColorFromString, lightenHsl } from "../../utils/color.js";

function AuthorProfile() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPostsByUser(id, 0, 9)
            .then((res) => {
                const content = res.data.content;
                if (content.length > 0) setAuthor(content[0].author);
                setPosts(content);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center text-gray-500 dark:text-[#94979e]">
            Loading...
        </div>
    );

    if (!author) return (
        <div className="min-h-[60vh] flex items-center justify-center text-center">
            <div>
                <h2 className="text-2xl font-semibold dark:text-white">Author not found</h2>
                <p className="text-gray-500 dark:text-[#94979e] mt-2">The author you're looking for doesn't exist.</p>
            </div>
        </div>
    );

    return (
        <section className="max-w-5xl mx-auto px-4 py-10">

            {/* HEADER */}
            <header className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="w-32 h-32 rounded-full object-cover border-[6px] border-black/5 dark:border-white/10"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold dark:text-white">{author.name}</h1>
                </div>
            </header>

            {/* STATS */}
            <section className="mt-10 grid grid-cols-2 gap-4 text-center">
                <div className="rounded-xl border border-black/20 dark:border-white/10 p-4 bg-[#f3f4f6] dark:bg-[#2e3141]">
                    <p className="text-2xl font-bold dark:text-white">{posts.length}</p>
                    <p className="text-sm text-gray-500 dark:text-[#94979e]">Articles</p>
                </div>
                <div className="rounded-xl border border-black/20 dark:border-white/10 p-4 bg-[#f3f4f6] dark:bg-[#2e3141]">
                    <p className="text-2xl font-bold dark:text-white">
                        {posts.reduce((acc, p) => acc + (p.viewCount || 0), 0)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-[#94979e]">Total Views</p>
                </div>
            </section>

            {/* POSTS */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                    Articles by {author.name}
                </h2>

                {posts.length === 0 ? (
                    <p className="text-gray-500 dark:text-[#94979e]">
                        This author hasn't published any articles yet.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => {
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
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AuthorProfile;