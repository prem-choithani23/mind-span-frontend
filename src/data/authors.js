// Local avatars (existing)
import AvatarWilliam from "../../public/assets/avatars/william.jpg";
import AvatarJane from "../../public/assets/avatars/misses.jpg";

const authors = [
    {
        id: 1,
        authorId: "auth-001",
        name: "William Lewis",
        slug: "william-lewis",
        imageUrl: AvatarWilliam,
        bio: "Frontend engineer writing deep dives on React internals, UI architecture, and performance.",
        role: "Senior Frontend Engineer",
        expertise: ["React", "UI Architecture", "Web Performance"],
        experienceYears: 7,
        articlesCount: 32,
        isFeatured: true,
        socials: {
            twitter: "https://x.com/",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
        },
        joinedAt: "2024-02-12",
        verified: true,
    },

    {
        id: 2,
        authorId: "auth-002",
        name: "Jane Walker",
        slug: "jane-walker",
        imageUrl: AvatarJane,
        bio: "Content strategist focused on design systems, UX writing, and product storytelling.",
        role: "Content Strategist",
        expertise: ["UX Writing", "Design Systems", "Product Content"],
        experienceYears: 6,
        articlesCount: 21,
        isFeatured: true,
        socials: {
            twitter: "https://x.com/",
            linkedin: "https://linkedin.com/in/",
        },
        joinedAt: "2024-03-01",
        verified: true,
    },

    {
        id: 3,
        authorId: "auth-003",
        name: "Alex Morgan",
        slug: "alex-morgan",
        imageUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=400&h=400",
        bio: "JavaScript developer writing about clean code, patterns, and scalable frontend systems.",
        role: "JavaScript Engineer",
        expertise: ["JavaScript", "Clean Code", "Frontend Architecture"],
        experienceYears: 5,
        articlesCount: 18,
        isFeatured: false,
        socials: {
            github: "https://github.com/",
        },
        joinedAt: "2024-05-18",
        verified: false,
    },

    {
        id: 4,
        authorId: "auth-004",
        name: "Sophia Bennett",
        slug: "sophia-bennett",
        imageUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=400&h=400",
        bio: "UX designer exploring human-centered design, accessibility, and visual clarity.",
        role: "UX Designer",
        expertise: ["UX Design", "Accessibility", "Visual Design"],
        experienceYears: 8,
        articlesCount: 26,
        isFeatured: true,
        socials: {
            linkedin: "https://linkedin.com/in/",
        },
        joinedAt: "2024-01-25",
        verified: true,
    },

    {
        id: 5,
        authorId: "auth-005",
        name: "Daniel Carter",
        slug: "daniel-carter",
        imageUrl:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=faces&fit=crop&w=400&h=400",
        bio: "Backend engineer writing about APIs, databases, and system scalability.",
        role: "Backend Engineer",
        expertise: ["APIs", "Databases", "System Design"],
        experienceYears: 6,
        articlesCount: 15,
        isFeatured: false,
        socials: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
        },
        joinedAt: "2024-04-10",
        verified: false,
    },

    {
        id: 6,
        authorId: "auth-006",
        name: "Emily Turner",
        slug: "emily-turner",
        imageUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=faces&fit=crop&w=400&h=400",
        bio: "Technical writer simplifying complex engineering concepts for developers.",
        role: "Technical Writer",
        expertise: ["Documentation", "Developer Experience", "APIs"],
        experienceYears: 9,
        articlesCount: 41,
        isFeatured: true,
        socials: {
            twitter: "https://x.com/",
        },
        joinedAt: "2023-11-03",
        verified: true,
    },

    {
        id: 7,
        authorId: "auth-007",
        name: "Noah Richardson",
        slug: "noah-richardson",
        imageUrl:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=faces&fit=crop&w=400&h=400",
        bio: "Full-stack developer sharing insights on modern web stacks and deployment.",
        role: "Full Stack Developer",
        expertise: ["React", "Node.js", "DevOps"],
        experienceYears: 4,
        articlesCount: 12,
        isFeatured: false,
        socials: {
            github: "https://github.com/",
        },
        joinedAt: "2024-06-02",
        verified: false,
    },

    {
        id: 8,
        authorId: "auth-008",
        name: "Olivia Hayes",
        slug: "olivia-hayes",
        imageUrl:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&w=400&h=400",
        bio: "Product manager writing about product thinking, roadmaps, and user research.",
        role: "Product Manager",
        expertise: ["Product Strategy", "User Research", "Agile"],
        experienceYears: 7,
        articlesCount: 19,
        isFeatured: false,
        socials: {
            linkedin: "https://linkedin.com/in/",
        },
        joinedAt: "2024-02-28",
        verified: true,
    },

    {
        id: 9,
        authorId: "auth-009",
        name: "Ethan Brooks",
        slug: "ethan-brooks",
        imageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&w=400&h=400",
        bio: "Software architect focusing on scalable systems and long-term maintainability.",
        role: "Software Architect",
        expertise: ["System Design", "Scalability", "Cloud"],
        experienceYears: 10,
        articlesCount: 34,
        isFeatured: true,
        socials: {
            linkedin: "https://linkedin.com/in/",
        },
        joinedAt: "2023-10-12",
        verified: true,
    },

    {
        id: 10,
        authorId: "auth-010",
        name: "Mia Collins",
        slug: "mia-collins",
        imageUrl:
            "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=faces&fit=crop&w=400&h=400",
        bio: "Junior developer documenting her learning journey in web development.",
        role: "Junior Web Developer",
        expertise: ["HTML", "CSS", "JavaScript"],
        experienceYears: 1,
        articlesCount: 6,
        isFeatured: false,
        socials: {},
        joinedAt: "2024-07-01",
        verified: false,
    },
];

export default authors;
