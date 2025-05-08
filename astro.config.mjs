// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
    site: "http://localhost:4321",
    integrations: [
        starlight({
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
        })
        , icon(), react()],

    vite: {
        plugins: [tailwindcss()],
    },
});