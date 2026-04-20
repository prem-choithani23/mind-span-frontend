import authors from "./authors.js";
import blogImagesData from "./blog_images_data.js";



const AUTHORS = authors
const BLOG_IMAGES = blogImagesData



const pickImage = (id) =>
    BLOG_IMAGES[(id - 1) % BLOG_IMAGES.length];

const pickAuthor = (id) =>
        AUTHORS[(id - 1) % AUTHORS.length];





const blogs = [
    {
        id: 1,
        slug: "together-happy-feelings-continue-juvenile-one-had",
        title: "Together Happy Feelings Continue Juvenile One Had",
        category: "Lifestyle",
        author: pickAuthor(1),
        imageUrl: pickImage(1),
        views: 10,
        comments: 0,
        readTime: 2,
        publishedAt: "2026-01-05",
        colors: { upper: "#c6def1", lower: "#bed5e8" },
        flags: { featured: false, editorPick: false, trending: true, topPick: true, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Why Small Moments Matter" },
                { type: "paragraph", text: "Happiness is rarely found in dramatic moments. It is often hidden in small, repeated experiences that quietly shape our emotional baseline." },
                { type: "subheading", text: "Consistency Over Intensity" },
                { type: "paragraph", text: "Brief moments of joy repeated over time create stability. Intense happiness fades quickly, but consistent joy compounds." },
                { type: "heading", level: 2, text: "Final Reflection" },
                { type: "paragraph", text: "Paying attention to small positive moments can dramatically improve long-term well-being." }
            ]
        }
    },
    {
        id: 2,
        slug: "assure-polite-his-really-and-others-figure-though",
        title: "Assure Polite His Really and Others Figure Though",
        category: "Lifestyle",
        author: pickAuthor(2),
        imageUrl: pickImage(2),
        views: 4,
        comments: 0,
        readTime: 2,
        publishedAt: "2024-09-01",
        colors: { upper: "#c6def1", lower: "#bed5e8" },
        flags: { featured: false, editorPick: false, trending: false, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "The Power of Courtesy" },
                { type: "paragraph", text: "Politeness is often misunderstood as weakness. In reality, it is a strategic social skill that builds trust and influence." },
                { type: "subheading", text: "Respect as a Social Signal" },
                { type: "paragraph", text: "Respectful behavior reduces friction and opens doors that aggression never will." }
            ]
        }
    },
    {
        id: 3,
        slug: "uneasy-no-settle-when-nature-narrow-in-afraid",
        title: "Uneasy No Settle When Nature Narrow in Afraid",
        category: "Travel",
        author: pickAuthor(3),
        imageUrl: pickImage(3),
        views: 10,
        comments: 0,
        readTime: 3,
        publishedAt: "2024-09-23",
        colors: { upper: "#f2c6de", lower: "#e9bed5" },
        flags: { featured: false, editorPick: false, trending: false, topPick: true, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Fear While Traveling Alone" },
                { type: "paragraph", text: "Travel exposes uncertainty. Fear often arises not from danger, but from unfamiliar environments." },
                { type: "subheading", text: "Growth Through Discomfort" },
                { type: "paragraph", text: "Facing uncertainty while traveling builds resilience and confidence." }
            ]
        }
    },
    {
        id: 4,
        slug: "everything-travelling-set-how-law-literature",
        title: "Everything Travelling Set How Law Literature",
        category: "Art & Design",
        author: pickAuthor(4),
        imageUrl: pickImage(4),
        views: 4,
        comments: 0,
        readTime: 4,
        publishedAt: "2024-09-20",
        colors: { upper: "#faedcb", lower: "#f0e4c3" },
        flags: { featured: false, editorPick: false, trending: false, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Art Inspired by Travel" },
                { type: "paragraph", text: "Travel reshapes perception. Artists often translate journeys into form, color, and structure." }
            ]
        }
    },
    {
        id: 5,
        slug: "day-advantages-end-sufficient-eat-towards",
        title: "Day Advantages End Sufficient Eat Towards",
        category: "Art & Design",
        author: pickAuthor(5),
        imageUrl: pickImage(5),
        views: 1,
        comments: 0,
        readTime: 3,
        publishedAt: "2024-09-18",
        colors: { upper: "#faedcb", lower: "#f0e4c3" },
        flags: { featured: false, editorPick: false, trending: true, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Design and Daily Rituals" },
                { type: "paragraph", text: "Small daily habits influence creativity more than occasional bursts of inspiration." }
            ]
        }
    },
    {
        id: 6,
        slug: "own-handsome-delicate-its-property-mistress",
        title: "Own Handsome Delicate Its Property Mistress",
        category: "Art & Design",
        author: pickAuthor(6),
        imageUrl: pickImage(6),
        views: 4,
        comments: 0,
        readTime: 3,
        publishedAt: "2024-09-19",
        colors: { upper: "#c9e4de", lower: "#c1dbd5" },
        flags: { featured: false, editorPick: false, trending: true, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Elegance Through Simplicity" },
                { type: "paragraph", text: "Design thrives when unnecessary elements are removed. Simplicity reveals intention." }
            ]
        }
    },
    {
        id: 7,
        slug: "my-entrance-me-is-disposal-bachelor-remember-relation",
        title: "My Entrance Me Is Disposal Bachelor Remember Relation",
        category: "Art & Design",
        author: pickAuthor(7),
        imageUrl: pickImage(7),
        views: 2,
        comments: 0,
        readTime: 2,
        publishedAt: "2024-09-17",
        colors: { upper: "#c6def1", lower: "#bed5e8" },
        flags: { featured: false, editorPick: false, trending: true, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Creative Independence" },
                { type: "paragraph", text: "Creative freedom often emerges when external expectations are reduced." }
            ]
        }
    },
    {
        id: 8,
        slug: "style-begin-mr-heard-by-in-music-tried-do",
        title: "Style Begin Mr Heard by in Music Tried Do",
        category: "Music",
        author: pickAuthor(8),
        imageUrl: pickImage(8),
        views: 6,
        comments: 0,
        readTime: 4,
        publishedAt: "2024-09-23",
        colors: { upper: "#f9ecca", lower: "#f0e4c3" },
        flags: { featured: false, editorPick: true, trending: false, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Finding Your Musical Voice" },
                { type: "paragraph", text: "Style emerges through experimentation, not imitation." }
            ]
        }
    },
    {
        id: 14,
        slug: "why-discipline-outlasts-motivation",
        title: "Why Discipline Always Outlasts Motivation",
        category: "Lifestyle",
        author: pickAuthor(14),
        imageUrl: pickImage(14),
        views: 21,
        comments: 3,
        readTime: 4,
        publishedAt: "2026-01-08",
        colors: { upper: "#c6def1", lower: "#bed5e8" },
        flags: { featured: true, editorPick: true, trending: true, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Motivation Is Unreliable" },
                { type: "paragraph", text: "Motivation fluctuates with mood and environment. Relying on it creates inconsistency and missed progress." },
                { type: "subheading", text: "Discipline as a System" },
                { type: "paragraph", text: "Discipline removes emotion from decision-making. When actions become routine, progress becomes inevitable." },
                { type: "heading", level: 2, text: "Long-Term Advantage" },
                { type: "paragraph", text: "Those who build disciplined systems outperform those who wait for inspiration." }
            ]
        }
    },
    {
        id: 15,
        slug: "traveling-alone-and-learning-yourself",
        title: "Traveling Alone and Learning Yourself",
        category: "Travel",
        author: pickAuthor(15),
        imageUrl: pickImage(15),
        views: 13,
        comments: 1,
        readTime: 5,
        publishedAt: "2026-01-06",
        colors: { upper: "#f2c6de", lower: "#e9bed5" },
        flags: { featured: false, editorPick: true, trending: false, topPick: true, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Solitude on the Road" },
                { type: "paragraph", text: "Solo travel removes social buffers and forces direct interaction with new environments." },
                { type: "subheading", text: "Self-Reliance" },
                { type: "paragraph", text: "Navigating unfamiliar places alone builds confidence and adaptability." }
            ]
        }
    },
    {
        id: 16,
        slug: "minimalism-in-art-and-design",
        title: "Minimalism in Art and Design",
        category: "Art & Design",
        author: pickAuthor(16),
        imageUrl: pickImage(16),
        views: 9,
        comments: 0,
        readTime: 3,
        publishedAt: "2026-01-04",
        colors: { upper: "#faedcb", lower: "#f0e4c3" },
        flags: { featured: false, editorPick: false, trending: true, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Less as a Creative Choice" },
                { type: "paragraph", text: "Minimalism emphasizes intention. Each element must justify its presence." },
                { type: "heading", level: 2, text: "Clarity Over Decoration" },
                { type: "paragraph", text: "Design clarity improves usability and emotional response." }
            ]
        }
    },
    {
        id: 17,
        slug: "music-as-an-emotional-language",
        title: "Music as an Emotional Language",
        category: "Music",
        author: pickAuthor(17),
        imageUrl: pickImage(17),
        views: 15,
        comments: 2,
        readTime: 4,
        publishedAt: "2026-01-03",
        colors: { upper: "#f9ecca", lower: "#f0e4c3" },
        flags: { featured: false, editorPick: true, trending: false, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Beyond Words" },
                { type: "paragraph", text: "Music communicates emotions that language often fails to capture." },
                { type: "subheading", text: "Universal Patterns" },
                { type: "paragraph", text: "Rhythm and melody resonate across cultures and experiences." }
            ]
        }
    },
    {
        id: 18,
        slug: "building-healthy-daily-routines",
        title: "Building Healthy Daily Routines",
        category: "Fitness",
        author: pickAuthor(18),
        imageUrl: pickImage(18),
        views: 19,
        comments: 4,
        readTime: 5,
        publishedAt: "2026-01-02",
        colors: { upper: "#c9e4de", lower: "#c1dbd5" },
        flags: { featured: true, editorPick: false, trending: true, topPick: true, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Routines Shape Health" },
                { type: "paragraph", text: "Health is a result of repeated behaviors, not isolated efforts." },
                { type: "subheading", text: "Consistency Beats Intensity" },
                { type: "paragraph", text: "Small daily actions create sustainable fitness outcomes." }
            ]
        }
    },
    {
        id: 19,
        slug: "creative-blocks-and-how-to-break-them",
        title: "Creative Blocks and How to Break Them",
        category: "Art & Design",
        author: pickAuthor(19),
        imageUrl: pickImage(19),
        views: 7,
        comments: 0,
        readTime: 3,
        publishedAt: "2025-12-30",
        colors: { upper: "#faedcb", lower: "#f0e4c3" },
        flags: { featured: false, editorPick: true, trending: false, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Why Blocks Happen" },
                { type: "paragraph", text: "Creative blocks often stem from pressure rather than lack of ideas." },
                { type: "heading", level: 2, text: "Lowering the Barrier" },
                { type: "paragraph", text: "Starting imperfectly is often the fastest way forward." }
            ]
        }
    },
    {
        id: 20,
        slug: "the-psychology-of-habits",
        title: "The Psychology of Habits",
        category: "Lifestyle",
        author: pickAuthor(20),
        imageUrl: pickImage(20),
        views: 26,
        comments: 5,
        readTime: 6,
        publishedAt: "2025-12-28",
        colors: { upper: "#c6def1", lower: "#bed5e8" },
        flags: { featured: true, editorPick: true, trending: true, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Habits Drive Behavior" },
                { type: "paragraph", text: "Much of daily behavior is automatic and habit-driven." },
                { type: "subheading", text: "Changing the Loop" },
                { type: "paragraph", text: "Awareness of cues and rewards enables habit change." }
            ]
        }
    },
    {
        id: 21,
        slug: "finding-balance-in-a-digital-world",
        title: "Finding Balance in a Digital World",
        category: "Lifestyle",
        author: pickAuthor(21),
        imageUrl: pickImage(21),
        views: 11,
        comments: 1,
        readTime: 4,
        publishedAt: "2025-12-26",
        colors: { upper: "#c6def1", lower: "#bed5e8" },
        flags: { featured: false, editorPick: false, trending: false, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Digital Overload" },
                { type: "paragraph", text: "Constant connectivity reduces attention and mental clarity." },
                { type: "heading", level: 2, text: "Intentional Use" },
                { type: "paragraph", text: "Boundaries restore focus and well-being." }
            ]
        }
    },
    {
        id: 22,
        slug: "why-rest-is-part-of-productivity",
        title: "Why Rest Is Part of Productivity",
        category: "Lifestyle",
        author: pickAuthor(22),
        imageUrl: pickImage(22),
        views: 14,
        comments: 2,
        readTime: 4,
        publishedAt: "2025-12-24",
        colors: { upper: "#c9e4de", lower: "#c1dbd5" },
        flags: { featured: false, editorPick: true, trending: false, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "The Cost of Burnout" },
                { type: "paragraph", text: "Continuous work without rest reduces long-term output." },
                { type: "subheading", text: "Strategic Recovery" },
                { type: "paragraph", text: "Rest enables creativity and sustained performance." }
            ]
        }
    },
    {
        id: 23,
        slug: "how-environments-shape-behavior",
        title: "How Environments Shape Behavior",
        category: "Lifestyle",
        author: pickAuthor(23),
        imageUrl: pickImage(23),
        views: 17,
        comments: 3,
        readTime: 5,
        publishedAt: "2025-12-22",
        colors: { upper: "#c6def1", lower: "#bed5e8" },
        flags: { featured: true, editorPick: false, trending: true, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Context Matters" },
                { type: "paragraph", text: "Behavior is often a response to surroundings rather than intention." },
                { type: "heading", level: 2, text: "Designing Better Spaces" },
                { type: "paragraph", text: "Intentional environments encourage better decisions." }
            ]
        }
    },

    {
        id: 24,
        slug: "how-ai-is-quietly-rewriting-everyday-decisions",
        title: "How AI Is Quietly Rewriting Everyday Decisions",
        category: "Artificial Intelligence",
        author: pickAuthor(1),
        imageUrl: pickImage(1),
        views: 128,
        comments: 6,
        readTime: 6,
        publishedAt: "2026-01-02",
        colors: { upper: "#dbeafe", lower: "#c7d2fe" },
        flags: { featured: true, editorPick: true, trending: true, topPick: false, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "AI Beyond the Hype" },
                { type: "paragraph", text: "Artificial Intelligence is no longer confined to research labs or sci-fi movies. It quietly influences what we watch, where we go, and even how we make decisions without us explicitly noticing." },
                { type: "subheading", text: "Invisible Algorithms in Daily Life" },
                { type: "paragraph", text: "Recommendation systems, fraud detection engines, and smart assistants rely on probabilistic models that adapt continuously based on human behavior." },
                { type: "subheading", text: "The Ethical Undercurrent" },
                { type: "paragraph", text: "As AI systems gain autonomy, questions around bias, transparency, and accountability become unavoidable. The challenge is not capability, but responsibility." },
                { type: "heading", level: 2, text: "Looking Ahead" },
                { type: "paragraph", text: "The future of AI will be defined less by raw intelligence and more by alignment with human values and social trust." }
            ]
        }
    },

    {
        id: 25,
        slug: "design-is-thinking-made-visible",
        title: "Design Is Thinking Made Visible",
        category: "Art & Design",
        author: pickAuthor(2),
        imageUrl: pickImage(2),
        views: 94,
        comments: 4,
        readTime: 5,
        publishedAt: "2026-01-03",
        colors: { upper: "#fde68a", lower: "#fcd34d" },
        flags: { featured: false, editorPick: true, trending: false, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "The Language of Visual Form" },
                { type: "paragraph", text: "Art and design communicate ideas without words. Composition, contrast, and hierarchy guide perception before logic engages." },
                { type: "subheading", text: "Function Meets Emotion" },
                { type: "paragraph", text: "Good design balances usability with emotional resonance, ensuring that form enhances meaning rather than obscuring it." },
                { type: "subheading", text: "Digital Tools, Human Intent" },
                { type: "paragraph", text: "Modern tools accelerate execution, but creativity still originates from human curiosity and intention." },
                { type: "heading", level: 2, text: "Design as Problem Solving" },
                { type: "paragraph", text: "Every design decision is a response to constraints — technical, cultural, or psychological." }
            ]
        }
    },

    {
        id: 26,
        slug: "scaling-a-business-without-losing-its-soul",
        title: "Scaling a Business Without Losing Its Soul",
        category: "Business",
        author: pickAuthor(3),
        imageUrl: pickImage(3),
        views: 210,
        comments: 9,
        readTime: 7,
        publishedAt: "2026-01-04",
        colors: { upper: "#dcfce7", lower: "#bbf7d0" },
        flags: { featured: true, editorPick: false, trending: true, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Growth Versus Identity" },
                { type: "paragraph", text: "Rapid expansion often challenges a company’s original mission. Scaling responsibly requires intentional cultural preservation." },
                { type: "subheading", text: "Systems Over Heroics" },
                { type: "paragraph", text: "Sustainable businesses rely on repeatable systems rather than individual brilliance." },
                { type: "subheading", text: "Customer Trust as Capital" },
                { type: "paragraph", text: "Long-term success is built on trust, not short-term optimization." },
                { type: "heading", level: 2, text: "The Long Game" },
                { type: "paragraph", text: "Businesses that endure prioritize values as much as valuation." }
            ]
        }
    },

    {
        id: 27,
        slug: "building-a-career-in-an-uncertain-world",
        title: "Building a Career in an Uncertain World",
        category: "Career",
        author: pickAuthor(4),
        imageUrl: pickImage(4),
        views: 176,
        comments: 8,
        readTime: 6,
        publishedAt: "2026-01-06",
        colors: { upper: "#e0e7ff", lower: "#c7d2fe" },
        flags: { featured: false, editorPick: true, trending: true, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "The End of Linear Paths" },
                { type: "paragraph", text: "Modern careers are no longer ladders but lattices, shaped by adaptability rather than tenure." },
                { type: "subheading", text: "Skills as Currency" },
                { type: "paragraph", text: "Transferable skills now outlast job titles and organizational structures." },
                { type: "subheading", text: "Learning as a Habit" },
                { type: "paragraph", text: "Continuous learning is no longer optional — it is survival." },
                { type: "heading", level: 2, text: "Redefining Success" },
                { type: "paragraph", text: "Meaningful careers balance growth, autonomy, and impact." }
            ]
        }
    },

    {
        id: 28,
        slug: "fashion-as-cultural-memory",
        title: "Fashion as Cultural Memory",
        category: "Fashion",
        author: pickAuthor(5),
        imageUrl: pickImage(5),
        views: 88,
        comments: 3,
        readTime: 5,
        publishedAt: "2026-01-07",
        colors: { upper: "#fce7f3", lower: "#fbcfe8" },
        flags: { featured: false, editorPick: false, trending: false, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Clothing Beyond Utility" },
                { type: "paragraph", text: "Fashion captures historical moments, social movements, and personal identity in tangible form." },
                { type: "subheading", text: "Cycles and Reinvention" },
                { type: "paragraph", text: "Trends recur, but context reshapes their meaning." },
                { type: "subheading", text: "Sustainability and Ethics" },
                { type: "paragraph", text: "Modern fashion faces growing responsibility toward environmental impact." },
                { type: "heading", level: 2, text: "Expression Over Consumption" },
                { type: "paragraph", text: "The future of fashion values intention over excess." }
            ]
        }
    },

    {
        id: 29,
        slug: "cinema-as-a-reflection-of-society",
        title: "Cinema as a Reflection of Society",
        category: "Film & Cinema",
        author: pickAuthor(6),
        imageUrl: pickImage(6),
        views: 140,
        comments: 7,
        readTime: 6,
        publishedAt: "2026-01-08",
        colors: { upper: "#fef3c7", lower: "#fde68a" },
        flags: { featured: false, editorPick: true, trending: false, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Stories on a Grand Scale" },
                { type: "paragraph", text: "Cinema amplifies human emotion, turning individual experiences into shared cultural narratives." },
                { type: "subheading", text: "Technology and Storytelling" },
                { type: "paragraph", text: "Advances in visual effects expand imagination but do not replace strong storytelling." },
                { type: "subheading", text: "Film as Social Commentary" },
                { type: "paragraph", text: "Movies often mirror societal tensions, aspirations, and fears." },
                { type: "heading", level: 2, text: "Why Films Endure" },
                { type: "paragraph", text: "Great cinema resonates long after the screen fades to black." }
            ]
        }
    },

    {
        id: 30,
        slug: "gadgets-that-changed-how-we-live",
        title: "Gadgets That Changed How We Live",
        category: "Gadgets",
        author: pickAuthor(7),
        imageUrl: pickImage(7),
        views: 265,
        comments: 11,
        readTime: 5,
        publishedAt: "2026-01-09",
        colors: { upper: "#ecfeff", lower: "#cffafe" },
        flags: { featured: true, editorPick: false, trending: true, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Small Devices, Big Impact" },
                { type: "paragraph", text: "From smartphones to wearables, gadgets reshape habits faster than policy or culture." },
                { type: "subheading", text: "Convenience Versus Dependency" },
                { type: "paragraph", text: "While gadgets save time, they also redefine attention." },
                { type: "subheading", text: "Design and Ecosystems" },
                { type: "paragraph", text: "Successful gadgets thrive within interconnected ecosystems." },
                { type: "heading", level: 2, text: "What Comes Next" },
                { type: "paragraph", text: "Future gadgets will fade into the background, becoming invisible infrastructure." }
            ]
        }
    },

    {
        id: 31,
        slug: "understanding-market-cycles",
        title: "Understanding Market Cycles",
        category: "Market",
        author: pickAuthor(8),
        imageUrl: pickImage(8),
        views: 198,
        comments: 5,
        readTime: 6,
        publishedAt: "2026-01-10",
        colors: { upper: "#f1f5f9", lower: "#e2e8f0" },
        flags: { featured: false, editorPick: false, trending: true, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Markets as Collective Psychology" },
                { type: "paragraph", text: "Markets move not just on data, but on expectations and fear." },
                { type: "subheading", text: "Boom and Bust Patterns" },
                { type: "paragraph", text: "Cycles repeat because human behavior remains consistent." },
                { type: "subheading", text: "Risk and Patience" },
                { type: "paragraph", text: "Long-term success favors disciplined strategies over speculation." },
                { type: "heading", level: 2, text: "Reading Signals" },
                { type: "paragraph", text: "Understanding cycles helps separate noise from meaningful trends." }
            ]
        }
    },

    {
        id: 32,
        slug: "nature-as-the-original-teacher",
        title: "Nature as the Original Teacher",
        category: "Nature",
        author: pickAuthor(9),
        imageUrl: pickImage(9),
        views: 120,
        comments: 4,
        readTime: 5,
        publishedAt: "2026-01-11",
        colors: { upper: "#dcfce7", lower: "#bbf7d0" },
        flags: { featured: false, editorPick: true, trending: false, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Lessons in Balance" },
                { type: "paragraph", text: "Natural systems demonstrate resilience through diversity and balance." },
                { type: "subheading", text: "Patterns Everywhere" },
                { type: "paragraph", text: "From fractals to seasons, nature operates through recurring patterns." },
                { type: "subheading", text: "Human Disconnection" },
                { type: "paragraph", text: "Modern life often distances us from ecological awareness." },
                { type: "heading", level: 2, text: "Relearning Respect" },
                { type: "paragraph", text: "Sustainability begins with understanding interdependence." }
            ]
        }
    },

    {
        id: 33,
        slug: "programming-as-structured-thinking",
        title: "Programming as Structured Thinking",
        category: "Programming",
        author: pickAuthor(10),
        imageUrl: pickImage(10),
        views: 302,
        comments: 14,
        readTime: 7,
        publishedAt: "2026-01-12",
        colors: { upper: "#e0f2fe", lower: "#bae6fd" },
        flags: { featured: true, editorPick: true, trending: true, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Beyond Syntax" },
                { type: "paragraph", text: "Programming trains the mind to decompose complex problems into manageable units." },
                { type: "subheading", text: "Abstraction and Reuse" },
                { type: "paragraph", text: "Well-written code captures intent, not just instructions." },
                { type: "subheading", text: "Debugging as Discovery" },
                { type: "paragraph", text: "Errors reveal hidden assumptions and mental models." },
                { type: "heading", level: 2, text: "Thinking in Systems" },
                { type: "paragraph", text: "Great programmers think in flows, constraints, and interactions." }
            ]
        }
    },

    {
        id: 34,
        slug: "technology-and-the-pace-of-change",
        title: "Technology and the Pace of Change",
        category: "Technology",
        author: pickAuthor(11),
        imageUrl: pickImage(11),
        views: 190,
        comments: 6,
        readTime: 6,
        publishedAt: "2026-01-13",
        colors: { upper: "#ede9fe", lower: "#ddd6fe" },
        flags: { featured: false, editorPick: false, trending: true, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Acceleration as the Norm" },
                { type: "paragraph", text: "Technological progress compounds, compressing adaptation cycles." },
                { type: "subheading", text: "Adoption Versus Understanding" },
                { type: "paragraph", text: "Society often adopts tools faster than it understands consequences." },
                { type: "subheading", text: "Human-Centered Tech" },
                { type: "paragraph", text: "Technology must serve human goals, not replace them." },
                { type: "heading", level: 2, text: "Choosing Direction" },
                { type: "paragraph", text: "The challenge is steering progress intentionally." }
            ]
        }
    },

    {
        id: 35,
        slug: "travel-as-perspective-expansion",
        title: "Travel as Perspective Expansion",
        category: "Travel",
        author: pickAuthor(12),
        imageUrl: pickImage(12),
        views: 155,
        comments: 5,
        readTime: 5,
        publishedAt: "2026-01-14",
        colors: { upper: "#ecfeff", lower: "#cffafe" },
        flags: { featured: false, editorPick: true, trending: false, topPick: true, latest: false },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Beyond Destinations" },
                { type: "paragraph", text: "Travel reshapes assumptions by exposing us to alternative norms." },
                { type: "subheading", text: "Cultural Humility" },
                { type: "paragraph", text: "Observing without judgment deepens understanding." },
                { type: "subheading", text: "Memory Over Miles" },
                { type: "paragraph", text: "Meaningful travel values experience over distance." },
                { type: "heading", level: 2, text: "Returning Changed" },
                { type: "paragraph", text: "Travel alters perspective long after returning home." }
            ]
        }
    },

    {
        id: 36,
        slug: "lifestyle-is-the-sum-of-small-choices",
        title: "Lifestyle Is the Sum of Small Choices",
        category: "Lifestyle",
        author: pickAuthor(13),
        imageUrl: pickImage(13),
        views: 220,
        comments: 10,
        readTime: 6,
        publishedAt: "2026-01-15",
        colors: { upper: "#f0fdf4", lower: "#dcfce7" },
        flags: { featured: true, editorPick: false, trending: true, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Habits Shape Identity" },
                { type: "paragraph", text: "Daily routines quietly construct long-term outcomes." },
                { type: "subheading", text: "Intentional Living" },
                { type: "paragraph", text: "Conscious choices replace default behavior." },
                { type: "subheading", text: "Balance Over Perfection" },
                { type: "paragraph", text: "Sustainable lifestyles adapt rather than optimize endlessly." },
                { type: "heading", level: 2, text: "Living Deliberately" },
                { type: "paragraph", text: "Small changes compound into meaningful lives." }
            ]
        }
    },

    {
        id: 37,
        slug: "music-as-emotional-architecture",
        title: "Music as Emotional Architecture",
        category: "Music",
        author: pickAuthor(14),
        imageUrl: pickImage(14),
        views: 132,
        comments: 4,
        readTime: 5,
        publishedAt: "2026-01-16",
        colors: { upper: "#fdf2f8", lower: "#fce7f3" },
        flags: { featured: false, editorPick: true, trending: false, topPick: false, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Sound and Memory" },
                { type: "paragraph", text: "Music encodes emotion, anchoring memories to sound." },
                { type: "subheading", text: "Structure and Release" },
                { type: "paragraph", text: "Melody and rhythm guide emotional tension." },
                { type: "subheading", text: "Universal Language" },
                { type: "paragraph", text: "Music transcends linguistic boundaries." },
                { type: "heading", level: 2, text: "Why Music Endures" },
                { type: "paragraph", text: "It speaks where words fall short." }
            ]
        }
    },

    {
        id: 38,
        slug: "fitness-as-long-term-investment",
        title: "Fitness as a Long-Term Investment",
        category: "Fitness",
        author: pickAuthor(15),
        imageUrl: pickImage(15),
        views: 260,
        comments: 12,
        readTime: 6,
        publishedAt: "2026-01-17",
        colors: { upper: "#e0f2fe", lower: "#bae6fd" },
        flags: { featured: true, editorPick: false, trending: true, topPick: true, latest: true },
        content: {
            blocks: [
                { type: "heading", level: 2, text: "Beyond Aesthetics" },
                { type: "paragraph", text: "Fitness supports cognitive health, resilience, and longevity." },
                { type: "subheading", text: "Consistency Beats Intensity" },
                { type: "paragraph", text: "Sustainable routines outperform short bursts of effort." },
                { type: "subheading", text: "Mind-Body Connection" },
                { type: "paragraph", text: "Physical movement regulates mental health." },
                { type: "heading", level: 2, text: "Training for Life" },
                { type: "paragraph", text: "Fitness is preparation for the decades ahead." }
            ]
        }
    }

];


export default blogs;



