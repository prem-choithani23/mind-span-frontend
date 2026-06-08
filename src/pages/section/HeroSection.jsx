import { useEffect, useState } from "react";
import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import HeroBlog from "../../components/HeroBlog.jsx";
import { getFeaturedPosts } from "../../api/services/postService.js";

export default function HeroSection() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getFeaturedPosts(6)
            .then((res) => {
                const shuffled = [...res.data.content].sort(() => Math.random() - 0.5);
                setPosts(shuffled.slice(0, 4));
            })
            .catch(console.error);
    }, []);

    if (!posts.length) return null;

    return (
        <MultipleItemSlider autoplay={true}>
            {posts.map((post) => (
                <HeroBlog key={post.id} heroBlog={post} />
            ))}
        </MultipleItemSlider>
    );
}