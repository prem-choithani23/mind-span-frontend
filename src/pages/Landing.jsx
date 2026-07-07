import React from "react";
import FeaturedSection from "./section/FeaturedSection.jsx";
import EditorsPicksSection from "./section/EditorsPicksSection.jsx";
import CategoryBlogSection from "./section/CategoryBlogSection.jsx";
import HeroSection from "./section/HeroSection.jsx";
import SliderCardGrouping from "./section/SliderCardGrouping.jsx";
import { useState , useEffect } from "react";
import { getAllCategories } from "../api/services/categoryService.js";
export default function Landing() {

    const [randomCategories, setRandomCategories] = useState([]);

    useEffect(() => {
        const load = async () => {
            const res = await getAllCategories();

            const shuffled = [...res.data].sort(() => Math.random() - 0.5);


            setRandomCategories(shuffled);

            // console.log("RANDOM: " + randomCategories)

    };

    load();
}, []);
    return (
        <div className="pt-8 lg:pt-11 xl:pt-15">
            <HeroSection />

            <SliderCardGrouping
                type={"Latest Posts"}
                isCategory:false
            />

            <SliderCardGrouping
                categoryId={randomCategories[1]?.id}
                type={randomCategories[1]?.name}
                isCategory
            />

            <CategoryBlogSection
                categoryId={randomCategories[2]?.id}
                categoryName={randomCategories[2]?.name}
            />

            <SliderCardGrouping
                categoryId={randomCategories[3]?.id}
                type={randomCategories[3]?.name}
                isCategory
            />

            <EditorsPicksSection />

            <FeaturedSection />

            <FeaturedSection />
        </div>
    );
}