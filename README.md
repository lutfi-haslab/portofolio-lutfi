# Lutfi Ikbal Majid — Portfolio & Knowledge Base 🚀

Personal portfolio, technical blog, and engineering documentation hub built with **Astro**, **Starlight**, **React 19**, and **Tailwind CSS 4**.

[![Site](https://img.shields.io/badge/Site-portofolio--lutfi.netlify.app-emerald.svg)](https://portofolio-lutfi.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Haslab--dev-181717.svg?logo=github)](https://github.com/Haslab-dev)

---

## 🌟 Featured Projects

| Project        | Category                | Tech Stack                               | Highlights                                                                                                                | Links                                              |
| :------------- | :---------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------- |
| **KendaliAI**  | AI & Systems            | TypeScript, React, WebSocket, Vector RAG | Autonomous AI Agent Control Center with live telemetry, multi-agent chat, task runner, and vector RAG ingestion.          | [GitHub](https://github.com/Haslab-dev/KendaliAI)  |
| **ForgeADE**   | Desktop & AI            | Go (Golang), Wails, React, CodeMirror 6  | Native, lightweight, AI-first development workspace without Electron overhead. Integrated agents, terminal, and Git.      | [GitHub](https://github.com/Haslab-dev/forge-ade)  |
| **Timenotes**  | Web & Mobile            | React, Next.js, TypeScript, Tailwind CSS | High-density productivity suite with Google-style calendar, compact timesheets, slide-over panels, and mobile UX.         | [GitHub](https://github.com/Haslab-dev/Timenotes)  |
| **MyAiRouter** | Systems & Gateway       | Go (Golang), WebSockets, React           | Ultra-low footprint AI model router & gateway inspired by 9router. Multi-provider load balancing and real-time dashboard. | [GitHub](https://github.com/Haslab-dev/MyAiRouter) |
| **HasCode UI** | Web Development         | Next.js, TypeScript, GPT/Claude API      | AI-powered website builder turning natural language prompts into production UI components.                                | [HasLab](https://github.com/Haslab-dev)            |
| **PRIfA CBDC** | Blockchain & FinTech    | React, NestJS, Flutter, Smart Contracts  | Central Bank Digital Currency suite (5 web portals + mobile wallet for DIDR stablecoin).                                  | —                                                  |
| **pChain**     | Blockchain as a Service | Next.js, Fastify, Besu, Polygon Edge     | BaaS platform simplifying blockchain development, IPFS storage, and smart contract management.                            | —                                                  |

---

## 🛠️ Tech Stack & Tooling

- **Core Framework**: [Astro 6](https://astro.build/)
- **Documentation & Blog**: [Starlight](https://starlight.astro.build/) & `starlight-blog`
- **UI & Components**: [React 19](https://react.dev/), [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) via Wrangler / Netlify

---

## 📁 Project Structure

```text
.
├── public/                 # Static assets and project screenshots
│   └── images/
│       └── projects/       # High-res visual mockups and previews
├── src/
│   ├── assets/             # Asset pipeline images & icons
│   ├── components/         # React & Astro interactive UI components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectSection.tsx  # Featured & grid project showcases
│   │   ├── BlogSection.tsx
│   │   └── ContactSection.tsx
│   ├── content/
│   │   └── docs/           # Starlight markdown & MDX documentation
│   │       ├── blog/       # Technical articles & blog posts
│   │       ├── project/    # In-depth project documentation pages
│   │       └── knowledge-base/
│   ├── data/
│   │   └── my-projects.tsx # Centralized project records and metadata
│   ├── pages/              # Astro pages (index.astro, rss.xml, etc.)
│   └── styles/             # Global CSS and Tailwind directives
├── astro.config.mjs        # Astro & Starlight configuration
└── package.json
```

---

## 💻 Local Development

### 1. Prerequisites

Ensure you have [Bun](https://bun.sh/) (or Node.js 20+) installed.

### 2. Installation

```bash
bun install
```

### 3. Start Development Server

```bash
bun run dev
```

Visit `http://localhost:4321` in your browser.

### 4. Build for Production

```bash
bun run build
```

### 5. Preview Production Build

```bash
bun run preview
```

### 6. Deploy to Cloudflare Pages

```bash
bun run deploy
```

---

## 👤 Author

**Lutfi Ikbal Majid**

- GitHub: [@lutfi-haslab](https://github.com/lutfi-haslab) / [@Haslab-dev](https://github.com/Haslab-dev)
- Website: [portofolio-lutfi.netlify.app](https://portofolio-lutfi.netlify.app)
