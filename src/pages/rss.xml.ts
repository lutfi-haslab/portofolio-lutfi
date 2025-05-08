import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context: any) {
    const blog = await getCollection('docs');
    return rss({
        title: 'Buzz’s Blog',
        description: 'A humble Astronaut’s guide to the stars',
        site: context.site,
        items: blog.map((post) => ({
            link: post.id,
            // Note: this will not process components or JSX expressions in MDX files.
            content: sanitizeHtml(parser.render(post.body as string), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }),
            ...post.data,
        })),
    });
}