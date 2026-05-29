// src/middleware/security-redirect-check.ts
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
    const { url } = context.request;
    const parsedUrl = new URL(url);

    const pathname = parsedUrl.pathname;

    // BLOCK or REDIRECT if pathname looks like a full URL (malicious intent)
    if (/^\/(https?:|\/\/|[\w-]+\.[\w-]+\/{2,})/.test(pathname)) {
        return new Response('Blocked: Suspicious URL path', {
            status: 400,
        });
    }

    return next();
};
