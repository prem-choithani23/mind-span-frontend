export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const isAuthenticated = () => Boolean(localStorage.getItem("accessToken"));