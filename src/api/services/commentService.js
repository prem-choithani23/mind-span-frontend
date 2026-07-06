import axiosInstance from "../axiosInstance.js"; // ⚠️ adjust to match your project's actual axios client import
import { commentEndpoints } from "../endpoints.js"; // ⚠️ adjust to wherever this file actually lives

const withParams = (template, params) =>
    Object.entries(params).reduce((url, [key, value]) => url.replace(`:${key}`, value), template);

// GET /api/v1/comments/{postId}?page=&size=
export const getCommentsByPost = (postId, { page = 0, size = 10 } = {}) =>
    axiosInstance.get(withParams(commentEndpoints.byPost, { postId }), { params: { page, size } });

// POST /api/v1/comments?postId=&commentorId=   body: CreateCommentRequest
// ⚠️ Guessing the body field is named `content` (matches Post's own field naming).
// If CreateCommentRequest actually expects a different key, tell me and I'll fix this one line.
export const createComment = (postId, body, commentorId) =>
    axiosInstance.post(commentEndpoints.create, { body }, { params: { postId, commentorId } });

// DELETE /api/v1/comments/{commentId}?userId=
export const deleteComment = (commentId, userId) =>
    axiosInstance.delete(withParams(commentEndpoints.delete, { commentId }), { params: { userId } });