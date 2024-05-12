import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Proxy /api requests to your backend server
            "/api": {
                target: "https://e-commerce-mgtd.onrender.com/", // Replace with your backend server URL
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
});
