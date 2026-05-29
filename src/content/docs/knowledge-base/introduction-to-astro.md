---
title: Introduction to Astro
description: Astro is a modern web framework focused on delivering
    lightning-fast websites with less JavaScript. It allows developers to build
    content-heavy sites like blogs, documentation, and marketing pages using their
    favorite UI frameworks—React, Vue, Svelte, or none at all.
date: 2025-05-08T19:06:00.000Z
authors:
    - lutfi
---

# 🌌 Introduction to Astro

![Astro Image](https://cdn.buttercms.com/xrVbfdR5TBy4iTaY4xl7)
Astro is a modern web framework focused on delivering lightning-fast websites with less JavaScript. It allows developers to build content-heavy sites like blogs, documentation, and marketing pages using their favorite UI frameworks—React, Vue, Svelte, or none at all.

## 🚀 Why Use Astro?

Astro addresses common pain points in modern frontend development:
• Zero JS by default: Ships minimal JavaScript to the client.
• Partial hydration: Only load JavaScript when and where needed.
• Component-agnostic: Use React, Svelte, Vue, Solid, or native .astro components.
• Built-in SSR & Static Generation: Configure per route.
• Fast by default: Leverages Vite under the hood for instant HMR and builds.

## 🛠️ Core Concepts

### 1. .astro Files

Astro files combine HTML-like syntax with a frontmatter script block:

```
---
const name = "Hasdev";
---

<h1>Hello {name}!</h1>
```

### 2. Islands Architecture

Astro promotes “islands architecture” — render most HTML on the server, hydrate interactive components as needed.

```
---
// Static content
import Counter from '../components/Counter.jsx';
---

<article>
  <h1>My Blog Post</h1>
  <p>Some static content here.</p>
  <Counter client:load />
</article>
```

Hydration options include:
• client:load
• client:idle
• client:visible
• client:media="(min-width: 600px)"

### 3. Routing

File-based routing using src/pages/:

```
src/
└── pages/
    ├── index.astro       => /
    ├── about.astro       => /about
    └── blog/[slug].astro => /blog/:slug
```

### 4. Data Fetching

Use the frontmatter script block to fetch data:

```
---
const response = await fetch("https://api.example.com/data");
const data = await response.json();
---

<ul>
  {data.map(item => <li>{item.title}</li>)}
</ul>

```

## 📦 Integrations

Astro supports first-class integrations:

- Tailwind: @astrojs/tailwind
- MDX: @astrojs/mdx
- Sitemap: @astrojs/sitemap
- Image optimization: @astrojs/image
- CMS: Sanity, Contentful, Notion, etc.

## ⚙️ Deployment

Astro supports multiple output targets:

- Static (SSG) (default)
- Server (SSR): for dynamic content
- Edge: Cloudflare Workers, Vercel Edge, Deno

```
// astro.config.mjs
export default defineConfig({
  output: "server", // or "static"
});
```

## 📈 Performance Advantage

Astro reduces Time to Interactive (TTI) by:

- Preferring static content
- Lazy-loading only what’s necessary

Benchmark comparisons show Astro sites often outperform traditional React/Vue SPAs.

### 🔍 Use Cases

- Documentation sites
- Marketing pages
- Blogs and content-rich websites
- Partial hydration in e-commerce UIs

### 📚 Resources

- Official Docs
- Astro GitHub
- Community Templates
- Awesome Astro

## 🧠 Final Thoughts

Astro represents a forward-thinking model for web development—static-first, framework-flexible, and performance-obsessed. It’s not about replacing React or Vue, but using them only where they’re needed, without compromising speed.
