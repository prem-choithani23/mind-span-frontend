import React, { useState } from "react";
import { useAuthorUpgradeStatus } from "../hooks/useAuthorUpgradeStatus"; // adjust path

export default function SubscribeEmail() {
    const { state, error, submit } = useAuthorUpgradeStatus();
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Ineligible (already AUTHOR/ADMIN, or logged out) or still loading -> render nothing
    if (state === "loading" || state === "ineligible") {
        return null;
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        await submit(message);
        setSubmitting(false);
        setMessage("");
    };

    const headline =
        state === "pending"
            ? "Your request is being reviewed"
            : state === "approved"
            ? "You're approved! 🎉"
            : state === "rejected"
            ? "Want to try again?"
            : "Got something worth writing about?";

    const subtext =
        state === "pending"
            ? "Our team is reviewing your request to become an author. We'll notify you once there's an update."
            : state === "approved"
            ? "Your request was approved. Refresh or log back in to unlock author tools."
            : state === "rejected"
            ? "Your previous request wasn't approved this time. You're welcome to submit a new one."
            : "Request author access and start publishing your own posts on MindSpan.";

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
                    <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
                    <p className="mt-2 text-sm text-[#6b6b6b] dark:text-gray-400">{subtext}</p>
                </div>

                {/* RIGHT SIDE — only show the form for "none" or "rejected" */}
                {(state === "none" || state === "rejected") && (
                    <div className="w-full max-w-xl">
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
                                disabled={submitting}
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
                                {submitting ? (
                                    <>
                                        <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-paper-plane text-sm"></i>
                                        {state === "rejected" ? "Try again" : "Request access"}
                                    </>
                                )}
                            </button>
                        </div>
                        {error && (
                            <p className="text-rose-500 text-xs mt-2 text-center lg:text-left">{error}</p>
                        )}
                    </div>
                )}

                {/* PENDING / APPROVED — just a status pill, no input */}
                {(state === "pending" || state === "approved") && (
                    <div
                        className="
              w-full max-w-xl rounded-full px-6 py-3
              bg-white dark:bg-[#24293a]
              text-sm font-medium
              flex items-center justify-center gap-2
            "
                    >
                        <i
                            className={`fa-solid ${
                                state === "approved" ? "fa-circle-check text-emerald-500" : "fa-clock text-amber-500"
                            }`}
                        ></i>
                        {state === "approved" ? "Approved — refresh to continue" : "Awaiting admin review"}
                    </div>
                )}
            </div>
        </div>
    );
}