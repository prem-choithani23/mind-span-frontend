export default function AuthorHeader({ author }) {
    return (
        <header className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Avatar */}
            <img
                src={author.imageUrl}
                alt={author.name}
                className="
                    w-32 h-32
                    rounded-full
                    object-cover

                    border-black/5
                    dark:border-white/10
                    border-[6px]
                "
            />

            {/* Info */}
            <div className="flex-1">
                <div className="flex items-center gap-3   ">
                    <h1 className="text-3xl font-bold dark:text-white">
                        {author.name}
                    </h1>

                    {author.verified && (
                        <span
                            className="
                                text-blue-500
                                text-sm
                                font-semibold
                                flex items-center gap-1
                            "
                        >
                            ✔ Verified
                        </span>
                    )}
                </div>

                {/* Role */}
                <p className="text-gray-600 dark:text-[#94979e] mt-1">
                    {author.role}
                </p>

                {/* Bio */}
                <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                    {author.bio}
                </p>

                {/* Expertise */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {author.expertise.map(skill => (
                        <span
                            key={skill}
                            className="
                                text-sm
                                px-3 py-1
                                rounded-full
                                bg-gray-100
                                text-gray-700
                                dark:bg-white/10
                                dark:text-gray-200
                            "
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </header>
    );
}
