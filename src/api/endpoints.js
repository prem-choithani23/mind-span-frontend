/* ===================== API PREFIX ===================== */
const API_PREFIX = "/api/v1";

/* ===================== CATEGORY ===================== */
const categoryEndpoints = {
    getAll: `${API_PREFIX}/categories`,
    getById: `${API_PREFIX}/categories/:id`,
    getBySlug: `${API_PREFIX}/categories/slug/:slug`,
    create: `${API_PREFIX}/categories`,
    update: `${API_PREFIX}/categories/:id`,
    delete: `${API_PREFIX}/categories/:id`,
};


/* ===================== TAG ===================== */
const tagEndpoints = {
    getAll: `${API_PREFIX}/tags`,
    getById: `${API_PREFIX}/tags/:id`,
    getBySlug: `${API_PREFIX}/tags/slug/:slug`,
    create: `${API_PREFIX}/tags`,
    update: `${API_PREFIX}/tags/:id`,
    delete: `${API_PREFIX}/tags/:id`,
};


/* ===================== POST ===================== */
const postEndpoints = {
    getAll: `${API_PREFIX}/posts`, // ?page=&size=&sortBy=&sortDir=
    getById: `${API_PREFIX}/posts/:id`,
    getBySlug: `${API_PREFIX}/posts/slug/:slug`,

    getPostByUser: `${API_PREFIX}/posts/user/:userId`, // ?page=&size=
    search: `${API_PREFIX}/posts/search`, // ?query=&page=&size=

    getPostsByCategory: `${API_PREFIX}/posts/category/:categoryId`, // ?page=&size=
    getPostsByTag: `${API_PREFIX}/posts/tag/:tagId`,

    publishPost: `${API_PREFIX}/posts/:id/publish`,
    uploadImage: `${API_PREFIX}/posts/:id/image`,
    likePost: `${API_PREFIX}/posts/like/:postId`,
    hasLikedPost: `${API_PREFIX}/post-user-like/:postId`,

    create: `${API_PREFIX}/posts`, // multipart/form-data
    update: `${API_PREFIX}/posts/:id`,
    delete: `${API_PREFIX}/posts/:id`,
};


/* ===================== AUTH ===================== */
const authEndpoints = {
    login: `${API_PREFIX}/auth/login`,
    verifyOtp: `${API_PREFIX}/auth/verify-otp`,
    register: `${API_PREFIX}/auth/register`,
    refresh: `${API_PREFIX}/auth/refresh`,
    forgotPassword: `${API_PREFIX}/password/forgot-password`,
};

/* ===================== COMMENT ===================== */
const commentEndpoints = {
    byPost: `${API_PREFIX}/comments/:postId`,
    create: `${API_PREFIX}/comments`,
    delete: `${API_PREFIX}/comments/:commentId`,
};


export {
    categoryEndpoints,
    tagEndpoints,
    postEndpoints,
    authEndpoints,
    commentEndpoints,
};
