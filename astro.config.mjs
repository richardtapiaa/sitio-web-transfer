import { defineConfig } from 'astro/config';

// taiwilind css
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://transporteeliud.com',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
});