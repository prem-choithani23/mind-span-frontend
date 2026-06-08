import API from "../axiosInstance.js";
import { authEndpoints } from "../endpoints.js";

export const loginUser = (credentials) =>
    API.post(authEndpoints.login, credentials);

export const verifyOtp = (data) =>
    API.post(authEndpoints.verifyOtp, data);

export const registerUser = (data) =>
    API.post(authEndpoints.register, data);

export const forgotPassword = (email) =>
    API.post(authEndpoints.forgotPassword, { email });