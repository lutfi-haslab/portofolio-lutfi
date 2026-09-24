// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://lutfiikbalmajid.pages.dev',
    image: {
        remotePatterns: [{ protocol: 'https' }],
    },
    integrations: [
        mdx(),
        react(),
        icon(),
        sitemap({
            filter: (page) => !page.includes('/admin'),
        }),
    ],
    vite: {
        plugins: [/** @type {any} */ (tailwindcss())],
    },
});
