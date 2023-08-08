/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBlack: "#00000080",
                secondaryBlack:"#00000333", 
                hover: "#708090",
            },
        },
    },
    plugins: [],
};
