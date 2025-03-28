import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
	},
	server: {
		port: 5173, // specify your port
		host: true, // needed if you're accessing from other devices
	},
});
