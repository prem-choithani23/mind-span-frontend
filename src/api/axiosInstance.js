import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Attach the access token to every outgoing request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Only handle 401s, and only once per request (avoid infinite retry loops)
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        // Don't attempt to refresh if the 401 came from the refresh/login endpoints themselves
        if (
            originalRequest.url?.includes("/auth/refresh") ||
            originalRequest.url?.includes("/auth/login")
        ) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            // A refresh is already in progress — queue this request until it resolves
            return new Promise((resolve, reject) => {
                pendingQueue.push({ resolve, reject });
            })
                .then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) throw new Error("No refresh token available");

            // NOTE: use a bare axios call here, not axiosInstance — we don't want
            // this request going through the same interceptor and recursing.
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh`,
                { refreshToken }
            );

            const newAccessToken = res.data.accessToken;
            const newRefreshToken = res.data.refreshToken; // if your backend rotates refresh tokens too

            localStorage.setItem("accessToken", newAccessToken);
            if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

            resolveQueue(null, newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
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

export default axiosInstance;