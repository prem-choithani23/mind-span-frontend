import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.js";

export default function ProtectedRoute() {
    const { pathname } = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: pathname }} replace />;
    }

    return <Outlet />;
}
