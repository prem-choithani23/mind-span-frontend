import blogs  from "./blogs";
import { timeAgo } from "../utils/timeAgo";
/* BASIC */

export const getAllBlogs = () => blogs;

export const getBlogById = (id) =>
    blogs.find((blog) => blog.id === id);


/*  HOME PAGE SECTIONS */

export const getFeaturedBlogs = () =>
    blogs.filter((blog) => blog.flags.featured);

export const getEditorsPicks = () =>
    blogs.filter((blog) => blog.flags.editorPick);

export const getTrendingBlogs = () =>
    blogs.filter((blog) => blog.flags.trending);

export const getLatestBlogs = () =>
    blogs
        .filter((blog) => blog.flags.latest)
        .sort(
            (a, b) =>
                new Date(b.publishedAt) - new Date(a.publishedAt)
        );

export const getTopPicks = (limit = 5) =>
    blogs
        .filter((blog) => blog.flags.topPick)
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);

/* CATEGORY / AUTHOR  */

export const getBlogsByCategory = (category) =>
    blogs.filter(
        (blog) =>
            blog.category.toLowerCase() === category.toLowerCase()
    );

export const getBlogsByAuthorSlug = (slug) =>
    blogs.filter(
        (blog) =>
            blog.author.slug.toLowerCase() === slug.toLowerCase()
    );

/*  SIDEBAR HELPERS */


export const getTrendingCompact = (limit = 3) =>
    blogs
        .filter(blog => blog.flags.trending)
        .sort((a, b) => b.views - a.views) // IMPORTANT
        .slice(0, limit)
        .map(blog => ({
            id: blog.id,
            title: blog.title,
            imageUrl: blog.imageUrl,
            upperColor: blog.colors.upper,
            slug: blog.slug,
            time: timeAgo(blog.publishedAt), // ✅ FIX
        }));

export const getLatestTitles = (limit = 3) =>
    blogs
        .filter(blog => blog.flags.latest)
        .sort(
            (a, b) =>
                new Date(b.publishedAt) - new Date(a.publishedAt)
        )
        .slice(0, limit)
        .map(blog => ({
            id: blog.id,
            title: blog.title,
            date: blog.publishedAt,
            slug:blog.slug// SidebarLatest expects `date`
        }));

export const getBlogBySlug = (slug) =>{

    return blogs.find((blog) => {
        // console.log(slug , blog.slug , slug===blog.slug);
         return blog.slug === slug;
    });

}