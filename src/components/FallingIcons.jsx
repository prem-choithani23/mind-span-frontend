import { useState } from "react";
import CATEGORY_ICONS from "../utils/categorySymbol.js";

/* Fisher–Yates shuffle (fair randomness) */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateIcons() {
    const iconSources = shuffle(Object.values(CATEGORY_ICONS));

    const ICON_COUNT = 18;

    return Array.from({ length: ICON_COUNT }).map((_, i) => {
        const src = iconSources[i % iconSources.length];

        return {
            id: i,
            src,

            /* spatial randomness */
            left: Math.random() * 100,

            /* size variation (subtle) */
            size: 64 + Math.random() * 40, // 64–104px

            /* VERY slow fall */
            duration: 50 + Math.random() * 40, // 50–90s

            /* desynchronized time phase */
            phase: Math.random() * 90,

            /* micro-variation for realism */
            driftX: (Math.random() - 0.5) * 20, // px
            rotate: Math.random() * 360,
        };
    });
}

export default function FallingIcons() {
    const [icons] = useState(generateIcons);

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 0,
            }}
        >
            {icons.map(icon => (
                <img
                    key={icon.id}
                    src={icon.src}
                    alt=""
                    style={{
                        position: "absolute",
                        top: "-140px",
                        left: `calc(${icon.left}% + ${icon.driftX}px)`,
                        width: `${icon.size}px`,

                        animation: `fall ${icon.duration}s linear infinite`,
                        animationDelay: `-${icon.phase}s`,

                        transform: `rotate(${icon.rotate}deg)`,

                        opacity: 0.3,
                        filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15))",
                    }}
                />
            ))}
        </div>
    );
}
