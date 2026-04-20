import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.js";

export default function AuthLayer() {
    const { pathname } = useLocation();
    const loggedIn = isAuthenticated();

    const isAuthPage = pathname === "/login" || pathname === "/register";

    // 🔒 Not logged in → block protected pages
    if (!loggedIn && !isAuthPage) {
        return <Navigate to="/login" replace />;
    }

    // 🔁 Logged in → block auth pages
    if (loggedIn && isAuthPage) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
