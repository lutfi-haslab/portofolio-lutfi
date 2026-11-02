// Language routing by geography (Lutfi's rule, 2026-11-03):
// visitors outside Indonesia get the English version of a page, visitors
// in Indonesia get the Indonesian one — but only when an ID⇄EN pair exists
// (see /langmap.json, generated at build time). A visitor's explicit choice
// always wins: the language-switch links carry ?lang=id|en, which is stored
// in a `lang` cookie and respected on later visits. Crawlers are never
// redirected, so indexing keeps following the hreflang setup. Redirects are
// 302 (temporary): the canonical language of a URL does not change.

import type { Env } from './api/_lib';

interface MwEnv extends Env {
    ASSETS: Fetcher;
}

interface PairEntry {
    to: string;
    toLang: 'id' | 'en';
}

let cachedPairs: Record<string, PairEntry> | null = null;

async function loadPairs(env: MwEnv, request: Request): Promise<Record<string, PairEntry>> {
    if (cachedPairs) return cachedPairs;
    try {
        const res = await env.ASSETS.fetch(new URL('/langmap.json', request.url));
        if (res.ok) {
            const data = (await res.json()) as { pairs?: Record<string, PairEntry> };
            cachedPairs = data.pairs || {};
            return cachedPairs;
        }
    } catch {
        /* fall through: no map, no redirects */
    }
    return {};
}

function cookieValue(request: Request, name: string): string | null {
    const header = request.headers.get('cookie') || '';
    for (const part of header.split(';')) {
        const [k, ...rest] = part.trim().split('=');
        if (k === name) return rest.join('=');
    }
    return null;
}

function langCookie(lang: string): string {
    return `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function withLangCookie(response: Response, lang: string): Response {
    const res = new Response(response.body, response);
    res.headers.append('Set-Cookie', langCookie(lang));
    return res;
}

function redirect(to: string, request: Request, lang: string): Response {
    return new Response(null, {
        status: 302,
        headers: {
            Location: new URL(to, request.url).toString(),
            'Set-Cookie': langCookie(lang),
            'Cache-Control': 'private, no-store',
        },
    });
}

export const onRequest: PagesFunction<MwEnv> = async ({ request, env, next }) => {
    const url = new URL(request.url);
    const rawPath = url.pathname;
    if (request.method !== 'GET') return next();
    if (rawPath.startsWith('/api/') || rawPath.startsWith('/_')) return next();
    if (/\.[a-z0-9]+$/i.test(rawPath)) return next(); // static files, feeds, langmap.json
    const isContent =
        rawPath === '/' ||
        rawPath.startsWith('/blog/') ||
        rawPath.startsWith('/en/') ||
        rawPath.startsWith('/social/');
    if (!isContent) return next();

    const ua = request.headers.get('user-agent') || '';
    if (/bot|spider|crawl|slurp|headless|preview|lighthouse/i.test(ua)) return next();

    const path = rawPath.endsWith('/') ? rawPath : rawPath + '/';
    const param = url.searchParams.get('lang');
    const paramLang = param === 'id' || param === 'en' ? param : null;
    const cookieLangRaw = cookieValue(request, 'lang');
    const cookieLang = cookieLangRaw === 'id' || cookieLangRaw === 'en' ? cookieLangRaw : null;
    const cf = (request as unknown as { cf?: { country?: string } }).cf;
    const geoLang: 'id' | 'en' = cf?.country && cf.country !== 'ID' ? 'en' : 'id';
    const desired: 'id' | 'en' = paramLang || cookieLang || geoLang;

    const pairs = await loadPairs(env, request);
    const entry = pairs[path];

    // Explicit switch (?lang=) or a stored/geo preference that differs from
    // this page's language: jump to the paired page when one exists.
    if (entry && entry.toLang === desired) {
        return redirect(entry.to, request, desired);
    }

    const response = await next();
    // First visit (no cookie, no explicit switch): remember the geo choice
    // so later pages and the /social/ filter can follow it.
    if (!cookieLang && !paramLang) return withLangCookie(response, desired);
    if (paramLang) return withLangCookie(response, paramLang);
    return response;
};
