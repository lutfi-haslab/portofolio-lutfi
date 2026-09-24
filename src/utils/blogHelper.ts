export function getPostImage(post: any): string | null {
    if (post.data?.cover?.image) {
        const img = post.data.cover.image;
        if (img.startsWith('http://') || img.startsWith('https://')) {
            return img;
        }
        if (img.startsWith('/')) {
            return img;
        }
        // Extract filename from relative path like ../../../assets/images/what-is-golang.png
        const parts = img.split('/');
        const filename = parts[parts.length - 1];
        return `/assets-img/${filename}`;
    }

    if (post.body) {
        const match = post.body.match(/!\[.*?\]\((.*?)(?:\s+".*?")?\)/);
        if (match && match[1]) {
            let rawUrl = match[1].trim();
            // Strip wrapping quotes if any
            rawUrl = rawUrl.replace(/^['"]|['"]$/g, '').split(' ')[0];
            if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
                return rawUrl;
            }
            if (rawUrl.startsWith('/')) {
                return rawUrl;
            }
            if (rawUrl.includes('assets/images/')) {
                const parts = rawUrl.split('/');
                const filename = parts[parts.length - 1];
                return `/assets-img/${filename}`;
            }
        }
    }

    // Default smart fallbacks based on post topic/tags
    const tags = (post.data?.tags || []).map((t: string) => t.toLowerCase());
    const id = (post.id || '').toLowerCase();

    if (id.includes('docker') || tags.includes('devops')) {
        return '/assets-img/screenshot-2025-05-09-at-14.51.23.png';
    }
    if (id.includes('disk-space') || id.includes('macos')) {
        return '/assets-img/screenshot-2025-05-09-at-14.51.49.png';
    }
    if (id.includes('git') || id.includes('commit')) {
        return '/assets-img/thumbnail-snippet@2x.png';
    }
    if (tags.includes('ai')) {
        return '/assets-img/Vibe_Coding_Tools.png';
    }
    if (tags.includes('architecture') || tags.includes('go')) {
        return '/assets-img/what-is-golang.png';
    }

    return '/assets-img/social-card.png';
}

export function getReadingTime(text: string = ''): string {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 220));
    return `${minutes} min read`;
}
