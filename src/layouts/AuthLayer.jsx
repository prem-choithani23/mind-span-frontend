import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.js";

export default function AuthLayer() {
    const { pathname } = useLocation();
    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (isAuthenticated() && isAuthPage) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}