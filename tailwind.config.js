import { requestFormReset } from "react-dom";

//** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            screens:{
              xl2:"1360px",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ]
};
