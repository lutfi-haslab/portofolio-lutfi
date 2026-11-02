import { cleanPath, json, visitorHash, type Env } from './_lib';

// POST /api/like  { path }
// Toggles the visitor's like for a page (one like per visitor, server-enforced).
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    let body: Record<string, unknown> = {};
    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        /* handled by validation below */
    }
    const path = cleanPath(body?.path);
    if (!path) return json({ ok: false, error: 'invalid_path' }, 400);

    const visitor = await visitorHash(request);
    const existing = await env.DB.prepare('SELECT 1 AS x FROM likes WHERE path = ? AND visitor = ?')
        .bind(path, visitor)
        .first<{ x: number }>();

    let liked: boolean;
    if (existing) {
        await env.DB.batch([
            env.DB.prepare('DELETE FROM likes WHERE path = ? AND visitor = ?').bind(path, visitor),
            env.DB.prepare(
                `UPDATE page_stats SET likes = MAX(likes - 1, 0), updated_at = datetime('now') WHERE path = ?`,
            ).bind(path),
        ]);
        liked = false;
    } else {
        await env.DB.batch([
            env.DB.prepare('INSERT OR IGNORE INTO likes (path, visitor) VALUES (?, ?)').bind(
                path,
                visitor,
            ),
            env.DB.prepare(
                `INSERT INTO page_stats (path, views, likes) VALUES (?, 0, 1)
                 ON CONFLICT(path) DO UPDATE SET likes = likes + 1, updated_at = datetime('now')`,
            ).bind(path),
        ]);
        liked = true;
    }

    const row = await env.DB.prepare('SELECT likes FROM page_stats WHERE path = ?')
        .bind(path)
        .first<{ likes: number }>();
    return json({ ok: true, path, likes: row?.likes ?? 0, liked });
};
