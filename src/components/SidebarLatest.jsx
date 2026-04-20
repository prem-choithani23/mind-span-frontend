import {Link} from "react-router-dom";

export default function SidebarLatest({ items }) {
    return (
        <div className="rounded-lg p-4 bg-[#f5f5f5] dark:bg-[#2e3141] dark:text-white">
            <h4 className="font-bold text-[22px] mb-4">Latest</h4>

            <div className="flex flex-col gap-4">
                {items.map((item, i) => (
                    <div key={i}>
                        <Link to={`/blogs/${item.slug}`}>
                            <p className="hover:underline font-medium dark:text-white text-[18px] text-black leading-snug">
                                {item.title}
                            </p>
                        </Link>

                        <span className="text-[13px] text-[#94979e]">
              {item.date}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
