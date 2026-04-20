/* ===================== CATEGORY ===================== */
const categoryEndpoints = {
    getAll: "/categories",
    getById: "/categories/:id",
    getBySlug: "/categories/slug/:slug",
    create: "/categories",
    update: "/categories/:id",
    delete: "/categories/:id",
};


/* ===================== TAG ===================== */
const tagEndpoints = {
    getAll: "/tags",
    getById: "/tags/:id",
    getBySlug: "/tags/slug/:slug",
    create: "/tags",
    update: "/tags/:id",
    delete: "/tags/:id",
};


/* ===================== POST ===================== */
const postEndpoints = {
    getAll: "/posts", // ?page=&size=&sortBy=&sortDir=
    getById: "/posts/:id",
    getBySlug: "/posts/slug/:slug",

    getPostByUser: "/posts/user/:userId", // ?page=&size=
    search: "/posts/search", // ?query=&page=&size=

    getPostsByCategory: "/posts/category/:categoryId", // ?page=&size=
    getPostsByTag: "/posts/tag/:tagId",

    publishPost: "/posts/:id/publish",
    uploadImage: "/posts/:id/image",

    create: "/posts", // multipart/form-data
    update: "/posts/:id",
    delete: "/posts/:id",
};


/* ===================== AUTH ===================== */
const authEndpoints = {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
};


export {
    categoryEndpoints,
    tagEndpoints,
    postEndpoints,
    authEndpoints,
};