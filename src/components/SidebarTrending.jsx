import {Link} from "react-router-dom";

export default function SidebarTrending({ items }) {

    return (
        <div className="mt-6">
            <h4 className="font-bold text-[22px] dark:text-white mb-4">Trending</h4>
            <div className="flex flex-col gap-4 bg-white dark:bg-[#212435]">
                {items.map((item, i) => (
                    <div key={i}

                         className="flex gap-3 items-center">
                        <img
                            style={{backgroundColor:item.upperColor}}
                            src={item.imageUrl}
                            alt=""
                            className="w-[90px] h-[90px] rounded-md"
                        />
                        <div>
                            <Link to={`/blogs/${item.slug}`}>
                                <p className="hover:underline text-[18px] font-medium leading-snug dark:text-white">
                                    {item.title}
                                </p>

                            </Link>

                                <span className="text-[13px] text-gray-400 dark:text-[#94979e]" >
                {item.time}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
