import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://fryup.uk',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
