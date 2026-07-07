import axiosInstance from "../axiosInstance.js"; // ⚠️ adjust to your actual axios client import
import { passwordEndpoints } from "../endpoints.js"; // ⚠️ add passwordEndpoints (below) to endpoints.js

/* Add this to endpoints.js:

const passwordEndpoints = {
    forgotPassword: `${API_PREFIX}/password/forgot-password`,
    reset: `${API_PREFIX}/password/reset`,
};

... and export it alongside the others.
*/

export const resetPassword = ({ userId, oldPassword, newPassword, confirmNewPassword }) =>
    axiosInstance.post(passwordEndpoints.reset, { userId, oldPassword, newPassword, confirmNewPassword });