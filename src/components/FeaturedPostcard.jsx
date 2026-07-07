import {Link} from "react-router-dom";
export default function FeaturedPostCard({
                                             post,
                                             upperColor,
                                             imageUrl,
                                             title,
                                             author,
                                             views = 0,
                                             comments = 0,
                                             minRead = 0,
                                             slug
                                         }) {
    const resolvedPost = post || {};
    const resolvedAuthor = resolvedPost.author ?? author;
    const imageSrc = resolvedPost.featuredImageUrl ?? imageUrl;
    const titleText = resolvedPost.title ?? title;
    const viewCount = resolvedPost.viewCount ?? views;
    const commentsCount = resolvedPost.commentCount ?? comments;
    const minReadTime = resolvedPost.readTime ?? minRead;
    const slugValue = resolvedPost.slug ?? slug;
    const cardColor = resolvedPost.colors?.upper ?? upperColor;
    return (
        <div
            style={{ backgroundColor: cardColor }}
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
                    src={imageSrc}
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
                <Link to={`/author/${resolvedAuthor?.id}`}>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className=" hover:underline font-medium">{resolvedAuthor?.name}</span>
                        <span>• 3 weeks ago</span>
                    </div>

                </Link>


                {/* Title */}
                <Link to={`/blogs/${slugValue}`}>

                    <h3 className="text-2xl xl:text-3xl font-bold leading-tight hover:underline">
                        {titleText}
                    </h3>
                </Link>


                {/* Meta */}
                <div className="text-sm text-gray-600 flex gap-2 flex-wrap">
                    <span>{commentsCount} Comments</span>
                    <span>•</span>
                    <span>{minReadTime} Min Read</span>
                    <span>•</span>
                    <span>{viewCount} Views</span>
                </div>
            </div>
        </div>
    );
}
