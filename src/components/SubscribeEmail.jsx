import React, { useState } from "react";
import roleUpgradeRequestService from "../api/services/roleUpgradeRequestService"; // adjust path to match your project
// adjust path to match your project

export default function SubscribeEmail() {
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

    return (
        <div
            className="mt-[50px]
        w-full
        py-2
        px-6
        min-h-[230px]
        bg-[#f7f7f7] text-[#1c1c1c]
        dark:bg-[#2f3444] dark:text-white
        flex items-center justify-center
      "
        >
            <div
                className="
          max-w-7xl mx-auto
          flex flex-col gap-10
          items-center text-center
          lg:flex-row lg:items-center lg:justify-between
          lg:text-left
        "
            >
                {/* LEFT TEXT */}
                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Got something worth writing about?
                    </h2>
                    <p className="mt-2 text-sm text-[#6b6b6b] dark:text-gray-400">
                        Request author access and start publishing your own posts on MindSpan.
                    </p>
                </div>

                {/* RIGHT INPUT */}
                <div className="w-full max-w-xl">
                    {status === "success" ? (
                        <div
                            className="
                                w-full rounded-full px-6 py-3
                                bg-white dark:bg-[#24293a]
                                text-sm font-medium
                                flex items-center justify-center gap-2
                            "
                        >
                            <i className="fa-solid fa-circle-check text-emerald-500"></i>
                            Request sent — we'll be in touch soon.
                        </div>
                    ) : (
                        <>
                            <div
                                className="
                                    w-full
                                    flex items-center
                                    rounded-full
                                    p-2

                                    bg-white
                                    dark:bg-[#24293a]
                                "
                            >
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Why do you want to write for us? (optional)"
                                    className="
                                        flex-1
                                        px-6 py-3
                                        bg-transparent
                                        outline-none
                                        text-gray-700
                                        placeholder-gray-400

                                        dark:text-gray-200
                                        dark:placeholder-gray-400
                                    "
                                />

                                <button
                                    onClick={handleSubmit}
                                    disabled={status === "loading"}
                                    className="
                                        flex items-center gap-2
                                        px-6 py-3
                                        rounded-full
                                        font-semibold
                                        shrink-0

                                        bg-[#faedcb] text-[#1c1c1c]
                                        hover:bg-[#f2c3da]

                                        dark:bg-[#f6d6e6]
                                        dark:text-[#1c1c1c]
                                        transition
                                        disabled:opacity-60 disabled:cursor-not-allowed
                                    "
                                >
                                    {status === "loading" ? (
                                        <>
                                            <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-paper-plane text-sm"></i>
                                            Request access
                                        </>
                                    )}
                                </button>
                            </div>
                            {error && (
                                <p className="text-rose-500 text-xs mt-2 text-center lg:text-left">{error}</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}