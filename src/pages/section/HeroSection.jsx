import React from "react"
import {getFeaturedBlogs} from "../../data/blogSelector.js";
import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import HeroBlog from "../../components/HeroBlog.jsx";
export default function HeroSection(){

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }


    const heroBlogs = shuffleArray(getFeaturedBlogs()).slice(0,4)

    return (
        <MultipleItemSlider autoplay={true}>
            {
                heroBlogs && heroBlogs.map(heroBlog => (
                    <HeroBlog heroBlog = {heroBlog}/>
                ))
            }
        </MultipleItemSlider>
    )
}