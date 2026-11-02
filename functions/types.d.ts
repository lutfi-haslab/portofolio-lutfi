// Minimal ambient types for Cloudflare Pages Functions + D1.
// (The repo does not depend on @cloudflare/workers-types; Wrangler strips
// types at deploy time, these declarations only serve local editors.)

interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T = Record<string, unknown>>(): Promise<T | null>;
    run(): Promise<unknown>;
    all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
}

interface D1Database {
    prepare(query: string): D1PreparedStatement;
    batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
}

interface Fetcher {
    fetch(input: string | URL | Request): Promise<Response>;
}

type PagesFunction<Env = unknown> = (context: {
    request: Request;
    env: Env;
    params: Record<string, string | string[]>;
    waitUntil: (promise: Promise<unknown>) => void;
    next: () => Promise<Response>;
}) => Promise<Response> | Response;
