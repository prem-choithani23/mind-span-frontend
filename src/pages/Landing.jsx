import React from "react";
import FeaturedSection from "./section/FeaturedSection.jsx";
import EditorsPicksSection from "./section/EditorsPicksSection.jsx";
import CategoryBlogSection from "./section/CategoryBlogSection.jsx";
import HeroSection from "./section/HeroSection.jsx";
import SliderCardGrouping from "./section/SliderCardGrouping.jsx";

export default function Landing() {



    return (
        <div
            className="
                pt-8
                lg:pt-11
                xl:pt-15
              "
        >
            {/*HERO SECTION*/}
            <HeroSection/>

            {/* LATEST POSTS */}
            <SliderCardGrouping type={"Latest Posts"} isCategory={false}/>

            {/* Art & Design */}
            <CategoryBlogSection category={"Art & Design"}/>

            {/*Editor's Choice*/}
            <EditorsPicksSection/>

            {/* Featured Section*/}
            <FeaturedSection/>

        </div>
    );
}
