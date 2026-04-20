import {Link} from "react-router-dom";
export default function FeaturedPostCard({
                                             upperColor,
                                             imageUrl,
                                             title,
                                             author,
                                             views = 0,
                                             comments = 0,
                                             minRead = 0,
                                             slug
                                         }) {
    return (
        <div
            style={{ backgroundColor: upperColor }}
            className="
        rounded-md
        overflow-hidden
        mx-auto

        /* FULL SCREEN */
        xl:w-[880px] xl:h-[440px]

        /* MID SCREEN */
        min-[1060px]:max-xl:w-[1000px]
        min-[1060px]:max-xl:h-[660px]

        flex
        flex-col
        xl:flex-row
      "
        >

            {/* IMAGE SECTION */}
            {/* IMAGE SECTION */}
            <div
                className="
    flex items-center justify-center
    overflow-hidden

    /* FULL SCREEN */
    xl:w-1/2 xl:h-full

    /* MID SCREEN */
    min-[1060px]:max-xl:w-full
    min-[1060px]:max-xl:flex-[3]
  "
            >
                <img
                    src={imageUrl}
                    alt=""
                    className="
      max-w-full max-h-full
      object-contain
    "
                />
            </div>



            {/* CONTENT SECTION */}
            {/* CONTENT SECTION */}
            <div
                className="
    flex flex-col justify-center gap-3
    p-6

    /* FULL SCREEN */
    xl:w-1/2 xl:h-full

    /* MID SCREEN */
    min-[1060px]:max-xl:flex-[1]
  "
            >

            {/* Author */}
                <Link to={`/author/${author.slug}`}>
                    <div className="flexitems-center gap-2 text-sm text-gray-600">
                        <span className=" hover:underline font-medium">{author.name}</span>
                        <span>• 3 weeks ago</span>
                    </div>

                </Link>


                {/* Title */}
                <Link to={`/blogs/${slug}`}>

                    <h3 className="text-2xl xl:text-3xl font-bold leading-tight hover:underline">
                        {title}
                    </h3>
                </Link>


                {/* Meta */}
                <div className="text-sm text-gray-600 flex gap-2 flex-wrap">
                    <span>{comments} Comments</span>
                    <span>•</span>
                    <span>{minRead} Min Read</span>
                    <span>•</span>
                    <span>{views} Views</span>
                </div>
            </div>
        </div>
    );
}
