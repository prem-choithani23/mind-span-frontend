import { useAuth } from "/src/context/AuthContext.jsx";

export const useRole = () => {
    const { user } = useAuth();
    const role = user?.role;

    return {
        role,
        isSubscriber: role === "SUBSCRIBER",
        isAuthor: role === "AUTHOR",
        isAdmin: role === "ADMIN",
        canWritePost: role === "SUBSCRIBER" ||role === "AUTHOR" || role === "ADMIN",
        canDeletePost: role === "AUTHOR",
        canManageTaxonomy: role === "ADMIN",
        canComment: !!user,
    };
};