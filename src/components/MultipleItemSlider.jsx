import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function PrevArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                absolute left-[-20px] top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full
                bg-[#faedcb]
                dark:bg-[#f2c6de]
                hover:bg-[#f2c6de]
                dark:hover:bg-[#faedcb]
                shadow-md
                flex items-center justify-center
                z-10
                transition-all
            "
        >
            <i className="fa-solid fa-arrow-left"></i>
        </button>
    );
}

function NextArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                absolute right-[-20px] top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full
                bg-[#faedcb]
                dark:bg-[#f2c6de]
                hover:bg-[#f2c6de]
                dark:hover:bg-[#faedcb]
                shadow-md
                flex items-center justify-center
                z-10
                transition-all
            "
        >
            <i className="fa-solid fa-arrow-right"></i>
        </button>
    );
}

export default function MultipleItemSlider({children , autoplay= false}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>,
        autoplay: autoplay,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    );
}
