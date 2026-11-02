import { cleanPath, json, visitorHash, type Env } from './_lib';

// GET /api/stats?path=/blog/slug/
// Returns the view/like counters for a page and whether this visitor liked it.
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
    const url = new URL(request.url);
    const path = cleanPath(url.searchParams.get('path'));
    if (!path) return json({ ok: false, error: 'invalid_path' }, 400);

    const visitor = await visitorHash(request);
    const row = await env.DB.prepare('SELECT views, likes FROM page_stats WHERE path = ?')
        .bind(path)
        .first<{ views: number; likes: number }>();
    const likeRow = await env.DB.prepare('SELECT 1 AS x FROM likes WHERE path = ? AND visitor = ?')
        .bind(path, visitor)
        .first<{ x: number }>();

    return json({
        ok: true,
        path,
        views: row?.views ?? 0,
        likes: row?.likes ?? 0,
        liked: !!likeRow,
    });
};
