import { useEffect, useState } from "react";
import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import EditorsPickCard from "../../components/EditorsPickCard.jsx";
import { getLatestPosts } from "../../api/services/postService.js";
import { pastelColorFromString, lightenHsl } from "../../utils/color.js";

export default function EditorsPicksSection() {
    const [picks, setPicks] = useState([]);

    useEffect(() => {
        getLatestPosts(8)
            .then((res) => {
                const shuffled = [...res.data.content].sort(() => Math.random() - 0.5);
                setPicks(shuffled.slice(0, 4));
            })
            .catch(console.error);
    }, []);

    const renderCard = (post) => {
        const upperColor = lightenHsl(pastelColorFromString(post.id.toString()), 6);
        return (
            <EditorsPickCard
                key={post.id}
                id={post.id}
                slug={post.slug}
                imageUrl={post.featuredImageUrl}
                title={post.title}
                author={post.author}
                upperColor={upperColor}
            />
        );
    };

    return (
        <div className="pt-[50px]">
            <div className="dark:text-white pb-[50px]">
                <div className="flex flex-col">
                    <p className="font-bold text-[28px]">Editor&apos;s Picks</p>
                    <p className="text-[#94979e]">Chosen by the editor</p>
                </div>
            </div>

            <div className="md:hidden">
                <MultipleItemSlider>
                    {picks.map(renderCard)}
                </MultipleItemSlider>
            </div>

            <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-8">
                {picks.map(renderCard)}
            </div>
        </div>
    );
}