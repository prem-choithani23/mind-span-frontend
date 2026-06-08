import API from "../axiosInstance.js";
import { categoryEndpoints } from "../endpoints.js";

const resolvePath = (path, params) =>
    Object.entries(params).reduce(
        (acc, [key, val]) => acc.replace(`:${key}`, val),
        path
    );

export const getAllCategories = () =>
    API.get(categoryEndpoints.getAll);

export const getCategoryBySlug = (slug) =>
    API.get(resolvePath(categoryEndpoints.getBySlug, { slug }));