import { defineConfig, mergeConfig } from "vitest/config";
import ViteConfig from "./vite.config";

export default mergeConfig(
    ViteConfig,
    defineConfig({
        test: {
            environment: "jsdom",
            globals: true,
            setupFiles: ["tests/setup.ts"],
            include: ["tests/**/*.{test,spec}.{ts,tsx}"],
            exclude: ["tests/*.test.ts", "tests/*.test.tsx"],
            css: true,
        },
    }));