import { Link } from "react-router-dom";
import Next from "../../public/assets/icons/next.png";

const NextIcon = (
    <img
        className="scale-[0.7]"
        src={Next}
        alt="Next"
    />
);

function convertText(text, separator = "-") {
    if (!text || typeof text !== "string") {
        return "";
    }

    return text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, separator)
        .replace(new RegExp(`^\\${separator}|\\${separator}$`, "g"), "");
}

export default function MoreButton({
    categoryName,
    hasLatestPosts = false,
}) {
    const navigateTo = hasLatestPosts
        ? "/blogs"
        : `/blogs?category=${encodeURIComponent(convertText(categoryName))}`;

    return (
        <Link
            to={navigateTo}
            className="w-[64px] pl-[10px] max-md:hidden font-bold hover:cursor-pointer hover:scale-[1.1] transition-all justify-center h-[25px] rounded-xl text-[#44464b] flex dark:bg-[#f2c6de] bg-[#faedcb] hover:bg-[#f2c6de]"
        >
            more {NextIcon}
        </Link>
    );
}