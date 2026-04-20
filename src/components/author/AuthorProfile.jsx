import { useParams } from "react-router-dom";
import authors from "../../data/authors.js";
import AuthorHeader from "./AuthorHeader";
import AuthorStats from "./AuthorStats";
import AuthorSocials from "./AuthorSocials";

import {getBlogsByAuthorSlug} from "../../data/blogSelector.js";
import BlogCard from "../BlogCard.jsx";

function AuthorProfile() {
    const { slug } = useParams();
    const author = authors.find(a => a.slug === slug);

    if (!author) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-center">
                <div>
                    <h2 className="text-2xl font-semibold dark:text-white">
                        Author not found
                    </h2>
                    <p className="text-gray-500 dark:text-[#94979e] mt-2">
                        The author you’re looking for doesn’t exist.
                    </p>
                </div>
            </div>
        );
    }

    const authorBlogs = getBlogsByAuthorSlug(author.slug);

    console.log(authorBlogs);

    return (
        <section className="max-w-5xl mx-auto px-4 py-10">
            <AuthorHeader author={author} />
            <AuthorStats author={author} blogCount={authorBlogs.length} />
            <AuthorSocials socials={author.socials} />

            {/* ================= AUTHOR BLOGS ================= */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                    Articles by {author.name}
                </h2>

                {authorBlogs.length === 0 ? (
                    <p className="text-gray-500 dark:text-[#94979e]">
                        This author hasn’t published any articles yet.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {authorBlogs.map(blog => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                slug={blog.slug}
                                title={blog.title}
                                imageUrl={blog.imageUrl}
                                author={blog.author}
                                comments={blog.comments}
                                views={blog.views}
                                category={blog.category}
                                time={blog.time}
                                upperColor={blog.colors.upper}
                                lowerColor={blog.colors.lower}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AuthorProfile;
