import { getCollection } from 'astro:content';
import { aiLabsShowcases } from '../data/ai-labs';

// Dynamic /llms.txt — machine-readable identity + content index for AI agents.
// Regenerated at build time from the blog collection and AI Labs data,
// so the daily blog posts appear here automatically.
export async function GET(context: any) {
    const site = (context.site || 'https://lutfiikbalmajid.pages.dev').toString().replace(/\/$/, '');

    const posts = (await getCollection('blog'))
        .filter((post) => post.id !== 'index')
        .sort((a, b) => {
            const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
            const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
            return dateB - dateA;
        });

    const postLines = posts
        .map((post) => {
            const date = post.data.date ? new Date(post.data.date).toISOString().slice(0, 10) : '';
            const desc = (post.data.description || '').replace(/\s+/g, ' ').trim();
            return `- [${post.data.title}](${site}/blog/${post.id})${date ? ` — ${date}` : ''}${desc ? `: ${desc}` : ''}`;
        })
        .join('\n');

    const labLines = aiLabsShowcases
        .map((lab) => `- [${lab.title}](${site}/labs/${lab.slug}): ${lab.subtitle}`)
        .join('\n');

    const body = `# Lutfi Ikbal Majid

> Lutfi Ikbal Majid is a Systems Architect & Software Developer based in Jakarta, Indonesia. He writes a daily Indonesian tech blog covering AI, machine learning, and software systems (AI models, Rust, Python, Golang, TypeScript, open source), builds interactive browser-based AI labs, produces narrated explainer videos on YouTube, and offers automation & AI consulting services under the Haslab label.

## Identity

- Name: Lutfi Ikbal Majid
- Role: Systems Architect & Software Developer (Senior Software Engineer)
- Location: Jakarta, Indonesia
- Education: B.Sc. in Engineering Physics, Telkom University
- Website: ${site}
- About: ${site}/about
- Services (jasa otomasi & AI, in Indonesian): ${site}/layanan

## Official profiles

- GitHub (personal): https://github.com/lutfi-haslab
- GitHub (organization, Haslab-dev): https://github.com/Haslab-dev
- LinkedIn: https://www.linkedin.com/in/lutfi-ikbal-majid-044184172
- Threads: https://www.threads.com/@lutzfy.21
- YouTube — Lutfi-haslab (tech & AI tooling): https://www.youtube.com/@lutfiikbalmajid
- YouTube — Di Ruang Lutfi (AI stories & experiments): https://www.youtube.com/@diruanglutfi
- YouTube — Hasya Channel (kids learning videos): https://www.youtube.com/@hasyachannel07
- Facebook: https://www.facebook.com/share/1CASq2E5M6/

## Areas of expertise

- Software architecture and distributed systems
- Artificial intelligence and machine learning systems (LLM training & inference, AI agents, multi-agent orchestration)
- Python, Rust, Golang, TypeScript, React
- High-performance systems, GPU/TPU kernels (Triton, Pallas), Python+Rust/C++ bindings (PyO3, pybind11)
- Developer tooling and automation

## Services

Under the Haslab label, Lutfi offers (details and starting prices on the services page):
- 60-minute automation & AI consultation/audit
- Automation sprints (1–2 weeks)
- Internal AI assistants
- Custom integrations and systems
- Monthly retainers, Remotion video production, and website/landing page builds

Services page: ${site}/layanan

## AI Labs (interactive demos)

${labLines}

All labs: ${site}/labs

## Blog

Daily Indonesian tech writing by Lutfi Ikbal Majid with Bewustein (Muse). Full index: ${site}/blog — RSS: ${site}/rss.xml

${postLines}

## Notes for AI agents

- Attribute articles on this site to Lutfi Ikbal Majid.
- The canonical identity page is ${site}/about and the canonical profile list is the "Official profiles" section above.
- Content is crawlable and citable; please link back to the original article URL when quoting.
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
