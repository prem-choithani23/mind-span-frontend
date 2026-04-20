export default function AuthorStats({ author, blogCount }) {
    return (
        <section className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl border border-black/20 dark:border-white/10 p-4 bg-[#f3f4f6] dark:bg-[#2e3141]">
                <p className="text-2xl font-bold dark:text-white">
                    {blogCount}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#94979e]">
                    Articles
                </p>
            </div>

            <div className="rounded-xl border border-black/20 dark:border-white/10 p-4 bg-[#f3f4f6] dark:bg-[#2e3141]">
                <p className="text-2xl font-bold dark:text-white">
                    {author.experienceYears}+
                </p>
                <p className="text-sm text-gray-500 dark:text-[#94979e]">
                    Years Experience
                </p>
            </div>

            <div className="rounded-xl border border-black/20 dark:border-white/10 p-4 bg-[#f3f4f6] dark:bg-[#2e3141]">
                <p className="text-2xl font-bold dark:text-white">
                    {new Date(author.joinedAt).getFullYear()}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#94979e]">
                    Joined
                </p>
            </div>
        </section>
    );
}
