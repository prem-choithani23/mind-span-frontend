import { useEffect, useState } from "react";
import BlogCardSpread from "../../components/BlogCardSpread.jsx";
import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import { getLatestPosts, getPostsByCategory } from "../../api/services/postService.js";
import { pastelColorFromString, lightenHsl } from "../../utils/color.js";
import { timeAgo } from "../../utils/timeAgo.js";
import { getBlogCardImage } from "../../utils/blogCardImage.js";
import Next from "../../../public/assets/icons/next.png";

export default function SliderCardGrouping({ type = "Latest Posts", isCategory = false, categoryId = null }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetch = isCategory && categoryId
            ? getPostsByCategory(categoryId, 0, 3)
            : getLatestPosts(3);

        fetch
            .then((res) => setPosts(res.data.content))
            .catch(console.error);
    }, [isCategory, categoryId]);

    const NextIcon = <img className="scale-[0.7]" src={Next} alt="Next-btn" />;

    return (
        <div className="pt-[50px]">
            <div className="dark:text-white pb-[50px]">
                <div className="flex lg:justify-between justify-between items-center">
                    <p className="font-bold text-[28px]">{type}</p>
                    <button className="w-[64px] pl-[10px] max-md:hidden font-bold hover:cursor-pointer hover:scale-[1.1] transition-all justify-center h-[25px] rounded-xl text-[#44464b] flex dark:bg-[#f2c6de] bg-[#faedcb] hover:bg-[#f2c6de]">
                        more {NextIcon}
                    </button>
                </div>
                <p className="text-[#94979e]">Latest posts from the blog</p>
            </div>

            <div className="block md:hidden">
                <MultipleItemSlider>
                    {posts.map((post) => {
                        const lowerColor = pastelColorFromString(post.id.toString());
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
                    const lowerColor = pastelColorFromString(post.id.toString());
                    const upperColor = lightenHsl(lowerColor, 6);
                    return (
                        <div key={post.id} className={index === 2 ? "col-span-2 xl:col-span-1" : ""}>
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
