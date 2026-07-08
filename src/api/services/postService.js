import API from "../axiosInstance.js";
import { postEndpoints } from "../endpoints.js";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

// Resolve :param style paths
const resolvePath = (path, params) =>
    Object.entries(params).reduce(
        (acc, [key, val]) => acc.replace(`:${key}`, val),
        path
    );

export const getPostById = (id) =>
    API.get(resolvePath(postEndpoints.getById, { id }));

export const getAllPosts = (page = DEFAULT_PAGE, size = DEFAULT_SIZE) =>
    API.get(postEndpoints.getAll, { params: { page, size } });

export const getPostBySlug = (slug) =>
    API.get(resolvePath(postEndpoints.getBySlug, { slug }));

export const getPostsByCategory = (categoryId, page = DEFAULT_PAGE, size = DEFAULT_SIZE) =>
    API.get(resolvePath(postEndpoints.getPostsByCategory, { categoryId }), {
        params: { page, size },
    });

export const getPostsByTag = (tagId, page = DEFAULT_PAGE, size = DEFAULT_SIZE) =>
    API.get(resolvePath(postEndpoints.getPostsByTag, { tagId }), {
        params: { page, size },
    });

export const getPostsByUser = (userId, page = DEFAULT_PAGE, size = DEFAULT_SIZE, status) =>
    API.get(resolvePath(postEndpoints.getPostByUser, { userId }), {
        params: status ? { page, size, status } : { page, size },
    });

export const searchPosts = (query, page = DEFAULT_PAGE, size = DEFAULT_SIZE) =>
    API.get(postEndpoints.search, { params: { query, page, size } });

export const getFeaturedPosts = (size = 5) =>
    API.get(postEndpoints.getAll, {
        params: { page: 0, size, sortBy: "viewCount", sortDir: "desc" },
    });

export const getTrendingPosts = (size = 5) =>
    API.get(postEndpoints.getAll, {
        params: { page: 0, size, sortBy: "viewCount", sortDir: "desc" },
    });

export const getLatestPosts = (size = 10) =>
    API.get(postEndpoints.getAll, {
        params: { page: 0, size, sortBy: "publishedAt", sortDir: "desc" },
    });

export const getPostLikeStatus = (postId) =>
    API.get(resolvePath(postEndpoints.hasLikedPost, { postId }));

export const getLikeStatus = (postId) =>
    getPostLikeStatus(postId);

export const createPost = (data) =>
    API.post(postEndpoints.create, data);

export const updatePost = (id, data) =>
    API.put(resolvePath(postEndpoints.update, { id }), data);

export const deletePost = (id) =>
    API.delete(resolvePath(postEndpoints.delete, { id }));

export const publishPost = (id) =>
    API.post(resolvePath(postEndpoints.publishPost, { id }));

export const uploadPostImage = (id, file) => {
    const form = new FormData();
    form.append("file", file);
    return API.post(resolvePath(postEndpoints.uploadImage, { id }), form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const likePost = (postId) =>
    API.post(resolvePath(postEndpoints.likePost, { postId }));