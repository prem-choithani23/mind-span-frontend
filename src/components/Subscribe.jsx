import React, { useState } from "react";
import { useAuthorUpgradeStatus } from "../hooks/useAuthorUpgradeStatus"; // adjust path

export default function Subscribe({ className = "" }) {
    const { state, error, submit } = useAuthorUpgradeStatus();
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const wrapperClass = `
        bg-[#f5f5f5]
        dark:bg-[#2e3141]
        rounded-xl
        p-6
        transition-colors
        ${className}
    `;

    if (state === "loading" || state === "ineligible") {
        return null;
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        await submit(message);
        setSubmitting(false);
        setMessage("");
    };

    if (state === "pending") {
        return (
            <div className={wrapperClass}>
                <h3 className="font-bold text-[22px] text-[#3b3f45] dark:text-white">
                    Request under review
                </h3>
                <p className="text-[#94979e] dark:text-[#92949c] text-sm mt-2">
                    Your request to become an author is being reviewed by our team. We'll let you know as soon as there's an update.
                </p>
            </div>
        );
    }

    if (state === "approved") {
        return (
            <div className={wrapperClass}>
                <h3 className="font-bold text-[22px] text-[#3b3f45] dark:text-white">
                    You're approved! 🎉
                </h3>
                <p className="text-[#94979e] dark:text-[#92949c] text-sm mt-2">
                    Your request was approved. Please refresh or log back in to unlock author tools.
                </p>
            </div>
        );
    }

    // state === "none" or "rejected"
    return (
        <div className={wrapperClass}>
            <h3 className="font-bold text-[22px] text-[#3b3f45] dark:text-white">
                {state === "rejected" ? "Try again?" : "Wanna write posts?"}
            </h3>

            <p className="text-[#94979e] dark:text-[#92949c] text-sm mt-2">
                {state === "rejected"
                    ? "Your previous request wasn't approved this time. You're welcome to submit a new one whenever you're ready."
                    : "Request author access and start publishing your own articles on MindSpan."}
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

            {error && <p className="text-rose-500 text-xs mt-2">{error}</p>}

            <button
                onClick={handleSubmit}
                disabled={submitting}
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
                {submitting ? (
                    <>
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                        Sending request...
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-paper-plane"></i>
                        {state === "rejected" ? "Submit new request" : "Request to become an author"}
                    </>
                )}
            </button>
        </div>
    );
}