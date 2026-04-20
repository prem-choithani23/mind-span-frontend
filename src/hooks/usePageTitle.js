import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const projectName = "mindSpan";

const titleMap = {
    "/": `${projectName} | Home`,
    "/blogs": `${projectName} | Blogs`,
    "/about": `${projectName} | About`,
    "/profile": `${projectName} | Profile`,
};

export default function usePageTitle() {
    const location = useLocation();

    useEffect(() => {
        document.title = titleMap[location.pathname] || projectName;
    }, [location.pathname]);
}
