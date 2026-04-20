import React from "react";
import {projectName} from "../hooks/usePageTitle.js";

export default function About() {

    const title = projectName
    return (
        <div className="min-h-screen bg-white dark:bg-[#212435] text-black dark:text-white">
            <div className="max-w-4xl mx-auto px-6 py-20">

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    About Us
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
                    Stories, ideas, and moments — written to be felt.
                </p>

                {/* Section */}
                <section className="space-y-6 text-[17px] leading-relaxed">
                    <p>
                        Welcome to <span className="font-semibold">{title}</span> — a place where
                        thoughts slow down, curiosity breathes, and stories matter.
                        We believe blogs aren’t just articles — they’re conversations,
                        emotions, and experiences shared across screens.
                    </p>

                    <p>
                        At {title}, we explore lifestyle, technology, creativity, art,
                        design, and ideas that make you pause and think.
                        Some posts are light. Some are deep.
                        All are written with intention.
                    </p>

                    <p>
                        In a world full of noise, {title} is about clarity.
                        No clickbait. No rush.
                        Just honest writing that respects your time and attention.
                    </p>

                    <p>
                        Our philosophy is simple:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Write with honesty</li>
                        <li>Read with curiosity</li>
                        <li>Share what resonates</li>
                    </ul>

                    <p>
                        Whether you’re here to learn something new, feel understood,
                        or simply scroll with purpose — you’re welcome here.
                    </p>

                    <p className="font-semibold text-xl pt-4">
                        This is {title}.
                    </p>
                </section>
            </div>
        </div>
    );
}
