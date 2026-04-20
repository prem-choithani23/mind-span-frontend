export default function AuthorSocials({ socials }) {
    if (!socials || Object.keys(socials).length === 0) return null;

    return (
        <section className="mt-8 flex gap-4 flex-wrap">
            {socials.twitter && (
                <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-500 hover:underline"
                >
                    Twitter
                </a>
            )}

            {socials.github && (
                <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:underline"
                >
                    GitHub
                </a>
            )}

            {socials.linkedin && (
                <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline"
                >
                    LinkedIn
                </a>
            )}
        </section>
    );
}
