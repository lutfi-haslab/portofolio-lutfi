-- Portfolio analytics: pageviews, per-page counters, likes.
-- Content stays static (Astro SSG); D1 only holds dynamic signals.

CREATE TABLE IF NOT EXISTS page_stats (
    path       TEXT PRIMARY KEY,
    views      INTEGER NOT NULL DEFAULT 0,
    likes      INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pageviews (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    path     TEXT NOT NULL,
    ts       TEXT NOT NULL DEFAULT (datetime('now')),
    referrer TEXT,
    country  TEXT,
    region   TEXT,
    city     TEXT,
    timezone TEXT,
    visitor  TEXT
);

CREATE INDEX IF NOT EXISTS idx_pageviews_path_ts ON pageviews (path, ts);
CREATE INDEX IF NOT EXISTS idx_pageviews_ts ON pageviews (ts);

CREATE TABLE IF NOT EXISTS likes (
    path    TEXT NOT NULL,
    visitor TEXT NOT NULL,
    ts      TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (path, visitor)
);
