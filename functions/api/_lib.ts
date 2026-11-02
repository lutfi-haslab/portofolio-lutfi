// Shared helpers for the portfolio analytics API (Pages Functions + D1).

export interface Env {
    DB: D1Database;
}

export function json(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
        },
    });
}

/** Normalize a page path: must be absolute, no query/hash, trailing slash. */
export function cleanPath(raw: unknown): string | null {
    if (typeof raw !== 'string') return null;
    let p = raw.trim().split('?')[0].split('#')[0];
    if (!p.startsWith('/') || p.length > 300 || p.includes('..')) return null;
    if (!p.endsWith('/')) p += '/';
    return p;
}

const SALT = 'lutfi-portofolio-v1';

/**
 * Stable anonymous visitor id: SHA-256 of salt + IP + user-agent.
 * The raw IP is never stored; the hash only powers like-dedupe.
 */
export async function visitorHash(request: Request): Promise<string> {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const ua = request.headers.get('user-agent') || '';
    const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(`${SALT}|${ip}|${ua}`),
    );
    return [...new Uint8Array(digest)]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 32);
}

export function isBot(request: Request): boolean {
    const ua = (request.headers.get('user-agent') || '').toLowerCase();
    return /bot|spider|crawl|slurp|headless|preview|pingdom|uptimerobot|lighthouse/.test(ua);
}
