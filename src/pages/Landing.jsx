import React from "react";
import FeaturedSection from "./section/FeaturedSection.jsx";
import EditorsPicksSection from "./section/EditorsPicksSection.jsx";
import CategoryBlogSection from "./section/CategoryBlogSection.jsx";
import HeroSection from "./section/HeroSection.jsx";
import SliderCardGrouping from "./section/SliderCardGrouping.jsx";

export default function Landing() {
    return (
        <div className="pt-8 lg:pt-11 xl:pt-15">
            <HeroSection />

            <SliderCardGrouping type="Latest Posts" isCategory={false} />

            <CategoryBlogSection
                categoryId={2}
                categoryName="Web Development"
            />

            <EditorsPicksSection />

            <FeaturedSection />
        </div>
    );
}