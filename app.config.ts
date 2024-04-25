import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: true,
  server: {
    baseURL: process.env.BASE_PATH,
    preset: "vercel"
  }
});
