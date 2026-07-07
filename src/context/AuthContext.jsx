import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const setUser = (userData) => {
        setUserState(userData);
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            localStorage.removeItem("user");
        }
    };

    // Rehydrate on page refresh
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");
        if (token && savedUser) {
            setAccessToken(token);
            setUserState(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData, tokens) => {
        setUser(userData);
        setAccessToken(tokens.accessToken);
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;