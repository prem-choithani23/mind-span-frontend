
// Generate stable pastel color (NO black / white / gray)
export function pastelColorFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;

    // 🔒 Hard constraints
    const saturation = 45;  // prevents gray
    const lightness = 76;   // prevents white

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Lighten safely (still NOT white)
export function lightenHsl(hsl, amount = 6) {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
    if (!match) return hsl;

    const h = match[1];
    const s = match[2];
    let l = parseInt(match[3], 10);

    // 🔒 Cap to avoid white
    l = Math.min(86, l + amount);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

export function hslToHsla(hsl, alpha = 1) {
    if (typeof hsl !== "string") return null;

    const match = hsl.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
    if (!match) return null;

    const h = match[1];
    const s = match[2];
    const l = match[3];

    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}

export function setHslLightness(hsl, lightness) {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
    if (!match) return hsl;

    const h = match[1];
    const s = match[2];
    const l = Math.max(0, Math.min(100, lightness));

    return `hsl(${h}, ${s}%, ${l}%)`;
}
