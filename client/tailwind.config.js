/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBlue: "#2874f0",
                primaryGreen: "#388e3c",
                orange: "#fb641b",
                primaryBg: "#f1f3f6",
                textHover: "#666666",
            },
            boxShadow: {
                primaryShadow: "0px_0px_8px_2px_rgba(212,212,212,0.6)",
            },
        },
    },
    plugins: [],
};
