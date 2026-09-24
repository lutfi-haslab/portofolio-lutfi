import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const blog = (await getCollection('blog')).filter((post) => post.id !== 'index');
    return rss({
        title: "Lutfi Ikbal Majid — Engineering Workspace",
        description: 'Engineering notes, systems architectures, and technical deep dives by Lutfi Ikbal Majid.',
        site: context.site || 'https://lutfiikbalmajid.pages.dev',
        items: blog.map((post) => ({
            title: post.data.title,
            description: post.data.description || '',
            pubDate: post.data.date || new Date(),
            link: `/blog/${post.id}`,
        })),
    });
}
