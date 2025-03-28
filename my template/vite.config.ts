import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173, // specify your port
		host: true, // needed if you're accessing from other devices
	},
});
