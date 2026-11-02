import { getCollection } from 'astro:content';

// Machine-readable map of ID ⇄ EN page pairs, generated at build time.
// Consumed by functions/_middleware.ts for geo/cookie language routing:
//   { "/blog/<id>/": { "to": "/en/blog/<pair>/", "toLang": "en" }, ... }
export async function GET() {
    const pairs: Record<string, { to: string; toLang: 'id' | 'en' }> = {};
    const add = (a: string, b: string, bLang: 'id' | 'en') => {
        pairs[a] = { to: b, toLang: bLang };
        pairs[b] = { to: a, toLang: bLang === 'en' ? 'id' : 'en' };
    };

    add('/blog/', '/en/blog/', 'en');

    const blog = await getCollection('blog');
    for (const post of blog) {
        const pair = (post.data as { pair?: string }).pair;
        if (!pair) continue;
        const lang = ((post.data as { lang?: string }).lang || 'id') as 'id' | 'en';
        if (lang === 'id') add(`/blog/${post.id}/`, `/en/blog/${pair}/`, 'en');
        else add(`/en/blog/${post.id}/`, `/blog/${pair}/`, 'id');
    }

    const social = await getCollection('social');
    for (const post of social) {
        const pair = (post.data as { pair?: string }).pair;
        if (!pair) continue;
        const lang = ((post.data as { lang?: string }).lang || 'id') as 'id' | 'en';
        add(`/social/${post.id}/`, `/social/${pair}/`, lang === 'id' ? 'en' : 'id');
    }

    return new Response(JSON.stringify({ pairs }), {
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'public, max-age=3600',
        },
    });
}
