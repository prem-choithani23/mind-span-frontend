// ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allowedRoles }) {
    const { pathname } = useLocation();
    const { user, isLoading } = useAuth();

    if (isLoading) return null; // or a spinner — avoid deciding before rehydration finishes

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: pathname }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}