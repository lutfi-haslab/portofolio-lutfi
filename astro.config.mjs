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
    image: {
        domains: ["res.cloudinary.com"],
        remotePatterns: [{ protocol: "https" }]
    },
    integrations: [starlight({
        title: 'HasLab by Lutfi',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/lutfi-haslab' }],
        sidebar: [
            {
                label: 'Knowledge Base',
                autogenerate: { directory: 'knowledge-base' },
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
