import React, { useState } from "react";

/* ---------------- COMMENT NODE ---------------- */

function CommentNode({ comment, onReply }) {
    const [replying, setReplying] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [text, setText] = useState("");

    const handleReply = () => {
        if (!text.trim()) return;

        onReply(comment.id, {
            id: Date.now(),
            author: "Guest",
            text,
            date: "just now",
            replies: []
        });

        setText("");
        setReplying(false);
        setCollapsed(false);
    };

    return (
        <div className="relative flex gap-4">
            {/* LEFT RAIL */}
            <div className="relative flex flex-col items-center">
                {/* AVATAR */}
                <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-bold">
                    {comment.author[0]}
                </div>

                {/* THREAD LINE */}
                {!collapsed && comment.replies?.length > 0 && (
                    <div className="flex-1 w-px bg-gray-300 dark:bg-gray-700 mt-2" />
                )}
            </div>

            {/* CONTENT */}
            <div className="flex-1 pb-8">
                <div className="bg-white dark:bg-[#2e3141] rounded-xl p-4 border border-black/5 dark:border-white/10">
                    <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold dark:text-white">
              {comment.author}
            </span>
                        <span className="text-gray-400 text-xs">
              {comment.date}
            </span>
                    </div>

                    <p className="mt-2 text-[15px] text-[#444] dark:text-gray-300">
                        {comment.text}
                    </p>

                    <div className="mt-3 flex gap-4 text-xs text-gray-500 items-center">
                        {/* TOGGLE */}
                        {comment.replies?.length > 0 && (
                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                className="hover:underline"
                            >
                                {collapsed ? "▾" : "▴"} {comment.replies.length}
                            </button>
                        )}

                        <button
                            onClick={() => setReplying(!replying)}
                            className="hover:underline"
                        >
                            Reply
                        </button>

                        <button className="hover:underline">Report</button>
                    </div>
                </div>

                {/* REPLY BOX */}
                {replying && (
                    <div className="mt-4 ml-6">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a reply..."
                className="
                w-full min-h-[80px]
                rounded-lg p-3 text-sm
                bg-white dark:bg-[#2e3141] dark:text-white
                border border-black/10 dark:border-white/10
                outline-none
              "
            />
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={handleReply}
                                className="
                  px-4 py-1.5 rounded-full
                  text-xs font-semibold
                  bg-[#f3f4f6] text-black
                  dark:text-black
                  dark:bg-[#fda5d5]
                  hover:scale-[1.1] hover:cursor-pointer
                "
                            >
                                Reply
                            </button>
                            <button
                                onClick={() => setReplying(false)}
                                className="text-xs text-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* REPLIES */}
                {!collapsed && comment.replies?.length > 0 && (
                    <div className="mt-6 space-y-6">
                        {comment.replies.map(reply => (
                            <CommentNode
                                key={reply.id}
                                comment={reply}
                                onReply={onReply}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------------- MAIN THREAD ---------------- */

export default function CommentSection({ blogId }) {
    const COMMENTS_PER_PAGE = 2;

    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Adamsdavid",
            text: "This community is AMAZING.",
            date: "20 hours ago",
            replies: [
                {
                    id: 2,
                    author: "Saramay",
                    text: "Totally agree.",
                    date: "16 hours ago",
                    replies: [
                        {
                            id: 3,
                            author: "Jessica21",
                            text: "This comment wins.",
                            date: "14 hours ago",
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            author: "Andrew231",
            text: "Super helpful, thanks!",
            date: "20 hours ago",
            replies: []
        },
        {
            id: 5,
            author: "Karan",
            text: "Bookmarking this.",
            date: "10 hours ago",
            replies: []
        }
    ]);

    const [newComment, setNewComment] = useState("");
    const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);

    const addReply = (parentId, reply) => {
        const attach = (nodes) =>
            nodes.map(n =>
                n.id === parentId
                    ? { ...n, replies: [...n.replies, reply] }
                    : { ...n, replies: attach(n.replies || []) }
            );

        setComments(prev => attach(prev));
    };

    const addComment = () => {
        if (!newComment.trim()) return;

        setComments(prev => [
            ...prev,
            {
                id: Date.now(),
                author: "Guest",
                text: newComment,
                date: "just now",
                replies: []
            }
        ]);

        setNewComment("");
    };

    return (
        <section key={blogId} className="mt-28 max-w-[760px]">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Comments
            </h2>

            {/* NEW COMMENT */}
            <div className="mb-10">
        <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="
            w-full min-h-[100px]
            rounded-xl p-4
            bg-white dark:bg-[#2e3141]
            dark:text-white
            border border-black/10 dark:border-white/10
            outline-none
          "
        />
                <div className="flex justify-end mt-3">
                    <button
                        onClick={addComment}
                        className="
                          px-5 py-2 rounded-full
                          text-sm font-semibold
                          bg-black text-white
                          dark:bg-[#fda5d5]
                          hover:cursor-pointer
                          hover:scale-[1.1]
                          dark:text-black
                        "
                    >
                        Post Comment
                    </button>
                </div>
            </div>

            {/* COMMENTS */}
            <div className="space-y-10">
                {comments.slice(0, visibleCount).map(comment => (
                    <CommentNode
                        key={comment.id}
                        comment={comment}
                        onReply={addReply}
                    />
                ))}
            </div>

            {/* VIEW MORE */}
            {visibleCount < comments.length && (
                <div className="mt-10 text-center">
                    <button
                        onClick={() =>
                            setVisibleCount(v => v + COMMENTS_PER_PAGE)
                        }
                        className="
                          px-6 py-2 rounded-full
                          text-sm font-semibold
                          bg-gray-100 dark:bg-[#fda5d5] dark:text-black hover:scale-[1.1] hover:cursor-pointer

                        "
                    >
                        View more comments
                    </button>
                </div>
            )}
        </section>
    );
}
