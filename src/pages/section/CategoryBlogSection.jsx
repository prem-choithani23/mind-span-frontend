import { useEffect, useState } from "react";
import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import BlogCardSpread from "../../components/BlogCardSpread.jsx";
import Subscribe from "../../components/Subscribe.jsx";
import TopPicks from "../../components/TopPicks.jsx";
import { getPostsByCategory } from "../../api/services/postService.js";
import { pastelColorFromString, lightenHsl } from "../../utils/color.js";
import { timeAgo } from "../../utils/timeAgo.js";
import { getBlogCardImage } from "../../utils/blogCardImage.js";
import Next from "/assets/icons/next.png";
import MoreButton from "../../components/MoreButton.jsx";

export default function CategoryBlogSection({
    categoryId,
    categoryName,
    title,
    subtitle,
    showSidebar = true,
    showMoreButton = true,
}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!categoryId) return;
        getPostsByCategory(categoryId, 0, 4)
            .then((res) => setPosts(res.data.content))
            .catch(console.error);
    }, [categoryId]);

    const NextIcon = <img className="scale-[0.7]" src={Next} alt="Next-btn" />;

    const renderCard = (post) => {
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
    };

    return (
        <div className="pt-[50px]">
            <div className="dark:text-white pb-[50px]">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-[28px]">{title || categoryName}</p>
                    {showMoreButton && (
                        <MoreButton categoryName={categoryName} />

                    )}
                </div>
                {subtitle && <p className="text-[#94979e]">{subtitle}</p>}
            </div>

            <div className="md:hidden">
                <MultipleItemSlider>
                    {posts.map(renderCard)}
                </MultipleItemSlider>
            </div>

            <div className="hidden md:flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row flex-wrap gap-5">
                        {posts.map((post) => (
                            <div key={post.id} className="w-full md:w-[calc(50%-10px)]">
                                {renderCard(post)}
                            </div>
                        ))}
                    </div>
                </div>
                {showSidebar && (
                    <div className="hidden xl:flex w-[340px] flex-col gap-6">
                        <Subscribe />
                        <TopPicks />
                    </div>
                )}
            </div>

            {showSidebar && (
                <div className="xl:hidden mt-10">
                    <Subscribe className="mb-10" />
                    <TopPicks />
                </div>
            )}
        </div>
    );
}
