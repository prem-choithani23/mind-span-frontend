import axios from "axios";
import { getAccessToken } from "../utils/auth.js";
import { authEndpoints } from "../endpoints.js";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

API.interceptors.request.use((req) => {
    const token = getAccessToken();
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ---- Refresh-on-401 logic ----
let isRefreshing = false;
let pendingQueue = []; // requests that arrived while a refresh was already in flight

function resolveQueue(error, newToken = null) {
    pendingQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(newToken);
    });
    pendingQueue = [];
}

API.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        // Only handle 401s, and only once per request (avoid infinite retry loops)
        if (!err.response || err.response.status !== 401 || originalRequest._retry) {
            return Promise.reject(err);
        }

        // Don't try to refresh if the 401 came from auth endpoints themselves
        if (
            originalRequest.url?.includes(authEndpoints.refresh) ||
            originalRequest.url?.includes(authEndpoints.login)
        ) {
            return Promise.reject(err);
        }

        if (isRefreshing) {
            // A refresh is already in progress — queue this request until it resolves
            return new Promise((resolve, reject) => {
                pendingQueue.push({ resolve, reject });
            })
                .then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return API(originalRequest);
                })
                .catch((queueErr) => Promise.reject(queueErr));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) throw new Error("No refresh token available");

            // Bare axios here, NOT the API instance — avoid recursing through
            // this same interceptor while refreshing.
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}${authEndpoints.refresh}`,
                { refreshToken }
            );

            const newAccessToken = res.data.accessToken;
            const newRefreshToken = res.data.refreshToken; // only if your backend rotates it

            localStorage.setItem("accessToken", newAccessToken);
            if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

            resolveQueue(null, newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return API(originalRequest);
        } catch (refreshError) {
            resolveQueue(refreshError, null);

            // Refresh token itself is invalid/expired — this is a real logout
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            window.location.href = "/login";

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default API;