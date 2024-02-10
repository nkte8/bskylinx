import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import partytown from '@astrojs/partytown';

// https://astro.build/config
/** @type {import('tailwindcss').Config} */
export default defineConfig({
  base: "/",
  site: "https://skyshare.uk/",
  trailingSlash: "always",
  server: {
    port: 4321,
    host: true
  },
  integrations: [
    react(), 
    tailwind(),
    partytown()
  ],
  output: "hybrid",
  adapter: cloudflare(),
});