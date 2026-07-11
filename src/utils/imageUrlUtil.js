const baseURL = import.meta.env.VITE_BASE_URL || "";    

export function getImageUrl(path) {
    if (!path || typeof path !== "string") return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (path.startsWith("/")) return `${baseURL}${path}`;

    return `${baseURL}/uploads/${path}`;
}