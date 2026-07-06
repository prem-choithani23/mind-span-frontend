import { useEffect, useState } from "react";
import { getFeaturedPosts, getLatestPosts, getTrendingPosts } from "../../api/services/postService.js";
import SidebarLatest from "../../components/SidebarLatest.jsx";
import SidebarTrending from "../../components/SidebarTrending.jsx";
import FeaturedPostCard from "../../components/FeaturedPostcard.jsx";
import { timeAgo } from "../../utils/timeAgo.js";
import { pastelColorFromString, lightenHsl } from "../../utils/color.js";
import { getBlogCardImage } from "../../utils/blogCardImage.js";

export default function FeaturedSection() {
    const [featured, setFeatured] = useState([]);
    const [latest, setLatest] = useState([]);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        getFeaturedPosts(2)
            .then((res) => setFeatured(res.data.content))
            .catch(console.error);

        getLatestPosts(3)
            .then((res) =>
                setLatest(
                    res.data.content.map((p) => ({
                        id: p.id,
                        title: p.title,
                        date: p.publishedAt,
                        slug: p.slug,
                    }))
                )
            )
            .catch(console.error);

        getTrendingPosts(3)
            .then((res) =>
                setTrending(
                    res.data.content.map((p) => ({
                        id: p.id,
                        title: p.title,
                        imageUrl: getBlogCardImage(p),
                        upperColor: lightenHsl(pastelColorFromString(p.id.toString()), 6),
                        slug: p.slug,
                        time: timeAgo(p.publishedAt),
                    }))
                )
            )
            .catch(console.error);
    }, []);

    return (
        <div className="pt-[50px]">
            <div className="dark:text-white pb-[50px]">
                <div className="flex flex-col">
                    <p className="font-bold text-[28px]">Featured</p>
                    <p className="text-[#94979e]">Most viewed posts</p>
                </div>
            </div>

            <div className="max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <div className="hidden lg:block">
                        <SidebarLatest items={latest} />
                        <SidebarTrending items={trending} />
                    </div>

                    <div className="flex flex-col gap-8">
                        {featured.map((post) => (
                            <FeaturedPostCard
                                key={post.id}
                                slug={post.slug}
                                id={post.id}
                                upperColor={lightenHsl(pastelColorFromString(post.id.toString()), 6)}
                                imageUrl={getBlogCardImage(post)}
                                title={post.title}
                                author={post.author}
                                views={post.viewCount}
                            />
                        ))}

                        <div className="block lg:hidden">
                            <SidebarLatest items={latest} />
                            <SidebarTrending items={trending} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
