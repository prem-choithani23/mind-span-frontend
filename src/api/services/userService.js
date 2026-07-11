import axiosInstance from "../axiosInstance.js"; // ⚠️ adjust to your actual axios client import
import { userEndpoints } from "../endpoints.js"; // ⚠️ add userEndpoints (below) to endpoints.js

/* Add this to endpoints.js:

const userEndpoints = {
    me: `${API_PREFIX}/users/me`,
    updateAvatar: `${API_PREFIX}/users/me/avatar`,
};

... and export it alongside the others.
*/

export const getMyProfile = () => axiosInstance.get(userEndpoints.me);

export const updateProfile = (payload) => axiosInstance.put(userEndpoints.me, payload);

export const uploadAvatar = (file) => {
    const form = new FormData();
    form.append("file", file);
    return axiosInstance.post(userEndpoints.updateAvatar, form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export function getPublicProfile(userId) {
    return API.get(userEndpoints.getPublicProfile.replace(":userId", userId));
}