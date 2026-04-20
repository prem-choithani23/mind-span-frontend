export const isAuthenticated = () =>
    Boolean(localStorage.getItem("auth"));

export const login = () =>
    localStorage.setItem("auth", "true");

export const logout = () =>
    localStorage.removeItem("auth");
