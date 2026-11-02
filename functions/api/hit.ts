import { cleanPath, isBot, json, visitorHash, type Env } from './_lib';

// POST /api/hit  { path, referrer? }
// Records one pageview (with Cloudflare geo) and bumps the page counter.
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    let body: Record<string, unknown> = {};
    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        /* empty body is fine, path will fail validation below */
    }
    const path = cleanPath(body?.path);
    if (!path) return json({ ok: false, error: 'invalid_path' }, 400);
    if (isBot(request)) return json({ ok: true, skipped: 'bot' });

    const cf = ((request as unknown as { cf?: Record<string, string> }).cf || {}) as Record<
        string,
        string
    >;
    const visitor = await visitorHash(request);
    const referrer =
        typeof body?.referrer === 'string' && body.referrer ? body.referrer.slice(0, 300) : null;

    await env.DB.batch([
        env.DB.prepare(
            'INSERT INTO pageviews (path, referrer, country, region, city, timezone, visitor) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ).bind(
            path,
            referrer,
            cf.country ?? null,
            cf.region ?? null,
            cf.city ?? null,
            cf.timezone ?? null,
            visitor,
        ),
        env.DB.prepare(
            `INSERT INTO page_stats (path, views, likes) VALUES (?, 1, 0)
             ON CONFLICT(path) DO UPDATE SET views = views + 1, updated_at = datetime('now')`,
        ).bind(path),
    ]);
    return json({ ok: true });
};
