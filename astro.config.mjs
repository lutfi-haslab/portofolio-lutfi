// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import starlightBlog from 'starlight-blog';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: "https://portofolio-lutfi.netlify.app",
    integrations: [starlight({
        title: 'Lutfi Portofolio',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
        sidebar: [
            {
                label: 'Guides',
                items: [
                    // Each item here is one entry in the navigation menu.
                    { label: 'Example Guide', slug: 'guides/example' },
                ],
            },
            {
                label: 'Reference',
                autogenerate: { directory: 'reference' },
            },
            {
                label: 'Project',
                autogenerate: { directory: 'project' },
            },
        ],
        plugins: [
            starlightBlog({
                authors: {
                    lutfi: {
                        name: 'Lutfi Ikbal Majid',
                        title: 'Software Engineer',
                        picture: 'https://avatars.githubusercontent.com/u/108409669?v=4', // Images in the `public` directory are supported.
                        url: 'https://github.com/lutfi-haslab',
                    },
                },
            })
        ]
    }), icon(), react(), sitemap({
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date('2025-05-08'),
    })],

    vite: {
        plugins: [tailwindcss()],
    },
});