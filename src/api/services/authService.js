import API from "../axiosInstance.js";
import { authEndpoints } from "../endpoints.js";

export const loginUser = (credentials) =>
    API.post(authEndpoints.login, credentials);

export const registerUser = (data) =>
    API.post(authEndpoints.register, data);