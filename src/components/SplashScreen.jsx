import React, { useEffect, useState } from "react";
import { projectName } from "../hooks/usePageTitle.js";

export default function SplashScreen({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);

            setTimeout(() => {
                setIsVisible(false);
                onComplete?.();
            }, 500);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#f8f9fb] to-[#eef2f7] dark:from-[#1b1f2b] dark:via-[#171b26] dark:to-[#10131b] transition-opacity duration-500 ${
                    isLoading ? "opacity-100" : "opacity-0"
                }`}
            >
                {/* Background Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-16 left-10 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl animate-blob"></div>

                    <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-400/20 blur-3xl animate-blob animation-delay-2"></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-400/15 blur-3xl animate-blob animation-delay-4"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center gap-8 px-6">
                    {/* Logo */}
                    <div className="animate-logo-jiggle">
                        <img
    src="/logo.png"
    alt="Logo"
    className="w-56 md:w-64 lg:w-72 h-56 md:h-64 lg:h-72 rounded-full object-cover"
/>
                    </div>

                    {/* Subtitle */}
                    <p className="text-gray-600 dark:text-gray-300 tracking-[0.3em] uppercase text-sm md:text-base animate-fade-in-up animation-delay-1">
                        Premium Stories & Insights
                    </p>

                    {/* Loading Dots */}
                    <div className="flex gap-3 animate-fade-in-up animation-delay-2">
                        <span className="w-3 h-3 rounded-full bg-sky-500 animate-bounce"></span>
                        <span className="w-3 h-3 rounded-full bg-sky-500 animate-bounce animation-delay-bounce-1"></span>
                        <span className="w-3 h-3 rounded-full bg-sky-500 animate-bounce animation-delay-bounce-2"></span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0%,100% {
                        transform: translate(0,0) scale(1);
                    }

                    33% {
                        transform: translate(35px,-45px) scale(1.08);
                    }

                    66% {
                        transform: translate(-25px,20px) scale(0.92);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes logoJiggle {
                    0%,100% {
                        transform: translateY(0) rotate(0deg) scale(1);
                    }

                    15% {
                        transform: translateY(-6px) rotate(-2deg) scale(1.02);
                    }

                    30% {
                        transform: translateY(3px) rotate(2deg) scale(1.04);
                    }

                    45% {
                        transform: translateY(-5px) rotate(-1.5deg) scale(1.02);
                    }

                    60% {
                        transform: translateY(2px) rotate(1.5deg) scale(1.03);
                    }

                    75% {
                        transform: translateY(-3px) rotate(-1deg) scale(1.01);
                    }
                }

                .animate-blob {
                    animation: blob 8s ease-in-out infinite;
                }

                .animate-logo-jiggle {
                    animation: logoJiggle 3s ease-in-out infinite;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 1s ease forwards;
                    opacity: 0;
                }

                .animation-delay-1 {
                    animation-delay: .3s;
                }

                .animation-delay-2 {
                    animation-delay: .6s;
                }

                .animation-delay-4 {
                    animation-delay: 4s;
                }

                .animation-delay-bounce-1 {
                    animation-delay: .2s;
                }

                .animation-delay-bounce-2 {
                    animation-delay: .4s;
                }
            `}</style>
        </>
    );
}