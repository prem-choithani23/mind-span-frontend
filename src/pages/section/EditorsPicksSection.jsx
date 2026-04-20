import MultipleItemSlider from "../../components/MultipleItemSlider.jsx";
import EditorsPickCard from "../../components/EditorsPickCard.jsx";
import {getEditorsPicks} from "../../data/blogSelector.js";
import {Link} from "react-router-dom";
export default function EditorsPicksSection() {
    const picks = getEditorsPicks().slice(0,4);

    return (
        <div className="pt-[50px]">

            {/* ================= HEADING ================= */}
            <div className="dark:text-white pb-[50px]">
                <div className="flex flex-col">
                    <p className="font-bold text-[28px]">
                        Editor&apos;s Picks
                    </p>
                    <p className="text-[#94979e]">
                        Chosen by the editor
                    </p>
                </div>
            </div>

            {/* ================= MOBILE : SLIDER ================= */}
            <div className="md:hidden">
                <MultipleItemSlider>
                    {picks.map((blog) => (
                        <EditorsPickCard
                            id={blog.id}
                            key={blog.id}
                            slug={blog.slug}

                            imageUrl={blog.imageUrl}
                            title={blog.title}
                            author={blog.author}
                            upperColor={blog.colors.upper}
                        />
                    ))}
                </MultipleItemSlider>
            </div>

            {/* ================= DESKTOP : ORIGINAL GRID ================= */}
            <div
                className="
                    hidden md:grid
                    grid-cols-2
                    xl:grid-cols-4
                    gap-8
                "
            >
                {picks.map((blog) => (
                    <EditorsPickCard
                        id={blog.id}
                        key={blog.id}
                        slug={blog.slug}

                        imageUrl={blog.imageUrl}
                        title={blog.title}
                        author={blog.author}
                        upperColor={blog.colors.upper}
                    />
                ))}
            </div>

        </div>
    );
}
