import { useEffect, useState } from "react";
import BlogCardSpread from "../../components/BlogCardSpread.jsx";
import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import {
    getLatestPosts,
    getPostsByCategory,
} from "../../api/services/postService.js";
import { getAllCategories } from "../../api/services/categoryService.js";
import { pastelColorFromString, lightenHsl } from "../../utils/color.js";
import { timeAgo } from "../../utils/timeAgo.js";
import { getBlogCardImage } from "../../utils/blogCardImage.js";
import Next from "../../../public/assets/icons/next.png";
import MoreButton from "../../components/MoreButton.jsx";

export default function SliderCardGrouping({
    type = "Latest Posts",
    isCategory = false,
    categoryId = null,
    randomCategory = false,
}) {
    const [posts, setPosts] = useState([]);
    const [heading, setHeading] = useState(type);

    const excerpt =
        type === "Latest Posts" ? (
            "Latest posts from the blog"
        ) : (
            <>
                Browse blogs belonging to <strong>{type}</strong> category!
            </>
        );

    useEffect(() => {
        const loadPosts = async () => {
            try {
                // Latest Posts
                if (!isCategory) {
                    const res = await getLatestPosts(3);
                    setPosts(res.data.content);
                    setHeading(type);
                    return;
                }

                // Random Category
                if (randomCategory) {
                    const categoryRes = await getAllCategories();
                    const categories = categoryRes.data;

                    if (!categories || categories.length === 0) {
                        setPosts([]);
                        return;
                    }

                    const shuffled = [...categories].sort(
                        () => Math.random() - 0.5
                    );

                    // Pick the first category that has posts
                    for (const category of shuffled) {
                        const postsRes = await getPostsByCategory(
                            category.id,
                            0,
                            3
                        );

                        if (postsRes.data.content.length > 0) {
                            setHeading(category.name);
                            setPosts(postsRes.data.content);
                            return;
                        }
                    }

                    // No category had posts
                    setPosts([]);
                    setHeading("Categories");
                    return;
                }

                // Fixed Category
                const res = await getPostsByCategory(categoryId, 0, 3);
                setPosts(res.data.content);
                setHeading(type);
            } catch (err) {
                console.error(err);
            }
        };

        loadPosts();
    }, [type, isCategory, categoryId, randomCategory]);

    const NextIcon = (
        <img
            className="scale-[0.7]"
            src={Next}
            alt="Next-btn"
        />
    );

    return (
        <div className="pt-[50px]">
            <div className="dark:text-white pb-[50px]">
                <div className="flex lg:justify-between justify-between items-center">
                    <p className="font-bold text-[28px]">{heading}</p>

                    <MoreButton categoryName={type} hasLatestPosts={type ==="Latest Posts"}/>
                </div>

                <p className="text-[#94979e]">
                    {excerpt}
                </p>
            </div>

            <div className="block md:hidden">
                <MultipleItemSlider>
                    {posts.map((post) => {
                        const lowerColor = pastelColorFromString(
                            post.id.toString()
                        );
                        const upperColor = lightenHsl(lowerColor, 6);

                        return (
                            <BlogCardSpread
                                key={post.id}
                                id={post.id}
                                slug={post.slug}
                                upperColor={upperColor}
                                lowerColor={lowerColor}
                                author={post.author}
                                category={post.category?.name}
                                views={post.viewCount}
                                time={timeAgo(post.publishedAt)}
                                title={post.title}
                                imageUrl={getBlogCardImage(post)}
                            />
                        );
                    })}
                </MultipleItemSlider>
            </div>

            <div className="hidden md:grid gap-5 grid-cols-2 xl:grid-cols-3">
                {posts.map((post, index) => {
                    const lowerColor = pastelColorFromString(
                        post.id.toString()
                    );
                    const upperColor = lightenHsl(lowerColor, 6);

                    return (
                        <div
                            key={post.id}
                            className={
                                index === 2
                                    ? "col-span-2 xl:col-span-1"
                                    : ""
                            }
                        >
                            <BlogCardSpread
                                id={post.id}
                                slug={post.slug}
                                upperColor={upperColor}
                                lowerColor={lowerColor}
                                author={post.author}
                                category={post.category?.name}
                                views={post.viewCount}
                                time={timeAgo(post.publishedAt)}
                                title={post.title}
                                imageUrl={getBlogCardImage(post)}
                                responsiveFeatured={index === 2}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}