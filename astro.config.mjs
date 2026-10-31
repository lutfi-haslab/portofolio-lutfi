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
            serialize(item) {
                if (item.url === 'https://lutfiikbalmajid.pages.dev/') {
                    item.priority = 1.0;
                    item.changefreq = 'daily';
                } else if (
                    item.url.includes('/blog/') &&
                    item.url !== 'https://lutfiikbalmajid.pages.dev/blog/'
                ) {
                    item.priority = 0.8;
                    item.changefreq = 'weekly';
                } else if (item.url.includes('/about') || item.url.includes('/layanan')) {
                    item.priority = 0.9;
                    item.changefreq = 'monthly';
                } else {
                    item.priority = 0.6;
                    item.changefreq = 'monthly';
                }
                return item;
            },
        }),
    ],
    vite: {
        plugins: [/** @type {any} */ (tailwindcss())],
    },
});
