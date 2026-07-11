import React, { useState } from "react";
import roleUpgradeRequestService from "../api/services/roleUpgradeRequestService"; // adjust path to match your project

export default function Subscribe({ className = "" }) {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        setStatus("loading");
        try {
            await roleUpgradeRequestService.create(message.trim());
            setStatus("success");
            setMessage("");
        } catch (err) {
            setStatus("idle");
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <div
                className={`
                    bg-[#f5f5f5]
                    dark:bg-[#2e3141]
                    rounded-xl
                    p-6
                    transition-colors
                    ${className}
                `}
            >
                <h3 className="font-bold text-[22px] text-[#3b3f45] dark:text-white">
                    Request sent!
                </h3>
                <p className="text-[#94979e] dark:text-[#92949c] text-sm mt-2">
                    Our team will review your request to become an author and get back to you soon.
                </p>
            </div>
        );
    }

    return (
        <div
            className={`
                bg-[#f5f5f5]
                dark:bg-[#2e3141]
                rounded-xl
                p-6
                transition-colors
                ${className}
            `}
        >
            <h3 className="font-bold text-[22px] text-[#3b3f45] dark:text-white">
                Wanna write posts?
            </h3>

            <p className="text-[#94979e] dark:text-[#92949c] text-sm mt-2">
                Request author access and start publishing your own articles on MindSpan.
            </p>

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us why you'd like to become an author (optional)"
                className="
                    w-full mt-4 px-4 py-3 rounded-full
                    outline-none border
                    bg-white dark:bg-[#212435]
                    text-black dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    border-gray-300 dark:border-[#3a3d4f]
                    transition-colors
                "
            />

            {error && (
                <p className="text-rose-500 text-xs mt-2">{error}</p>
            )}

            <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="
                    w-full mt-4 py-3 rounded-full
                    bg-[#faedcb] dark:bg-[#f2c6de]
                    font-semibold text-[#3b3f45]
                    hover:bg-[#f2c6de]
                    hover:scale-[1.03]
                    transition-all
                    flex items-center justify-center gap-2
                    disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed
                "
            >
                {status === "loading" ? (
                    <>
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                        Sending request...
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-paper-plane"></i>
                        Request to become an author
                    </>
                )}
            </button>
        </div>
    );
}