import React, { useEffect, useState } from 'react';
import { FiCommand, FiGithub, FiGlobe, FiMenu, FiX } from 'react-icons/fi';

// ID/EN language switch. Targets come from /langmap.json (built from the
// content pairs): when this page has a twin in the other language the
// switch jumps straight to it, otherwise it falls back to that language's
// blog index. The ?lang= parameter makes the middleware store the choice
// in a cookie, so the geo routing respects it afterwards.
const LangSwitch: React.FC = () => {
    const [lang, setLang] = useState<'id' | 'en'>('id');
    const [targets, setTargets] = useState<{ id: string; en: string }>({
        id: '/blog/?lang=id',
        en: '/en/blog/?lang=en',
    });

    useEffect(() => {
        const raw = window.location.pathname;
        const path = raw.endsWith('/') ? raw : raw + '/';
        const cookieLang = /(?:^|; )lang=(id|en)(?:;|$)/.exec(document.cookie)?.[1] as
            | 'id'
            | 'en'
            | undefined;
        let current: 'id' | 'en' = path.startsWith('/en/') ? 'en' : cookieLang || 'id';
        fetch('/langmap.json')
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                const entry = data?.pairs?.[path];
                if (entry) {
                    if (entry.toLang === 'en') {
                        current = 'id';
                        setTargets({ id: `${path}?lang=id`, en: `${entry.to}?lang=en` });
                    } else {
                        current = 'en';
                        setTargets({ id: `${entry.to}?lang=id`, en: `${path}?lang=en` });
                    }
                }
                setLang(current);
            })
            .catch(() => setLang(current));
    }, []);

    const cls = (active: boolean) =>
        `px-2 py-1 rounded-md transition-colors ${
            active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
        }`;

    return (
        <div
            className="flex items-center rounded-lg bg-gray-900 border border-gray-800 p-0.5 text-[11px] font-mono"
            role="group"
            aria-label="Language / Bahasa"
        >
            <FiGlobe className="w-3.5 h-3.5 text-gray-500 ml-1.5 mr-0.5" aria-hidden="true" />
            <a href={targets.id} className={cls(lang === 'id')} aria-current={lang === 'id'}>
                ID
            </a>
            <a href={targets.en} className={cls(lang === 'en')} aria-current={lang === 'en'}>
                EN
            </a>
        </div>
    );
};

const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const triggerPalette = () => {
        window.dispatchEvent(new CustomEvent('open-command-palette'));
    };

    return (
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/80 font-sans">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-5xl">
                {/* Brand */}
                <a href="/" className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-gray-950 font-bold font-mono text-sm shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                        L
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-white tracking-wide text-sm sm:text-base">
                            LUTFI
                        </span>
                        <span className="text-gray-600 hidden sm:inline">•</span>
                        <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                            Software Engineer
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
                    <a
                        href="/project"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Projects
                    </a>
                    <a
                        href="/layanan"
                        className="text-gray-300 hover:text-emerald-400 transition-colors"
                    >
                        Layanan
                    </a>
                    <a
                        href="/labs"
                        className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center space-x-1.5"
                    >
                        <span>AI Labs</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                            3D
                        </span>
                    </a>
                    <a
                        href="/blog"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Writings
                    </a>
                    <a
                        href="/social"
                        className="text-gray-300 hover:text-emerald-400 transition-colors"
                    >
                        Social
                    </a>
                    <a
                        href="/about"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        About
                    </a>
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-3">
                    <LangSwitch />
                    <button
                        onClick={triggerPalette}
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700 text-xs transition-all cursor-pointer"
                        title="Search (⌘K)"
                    >
                        <FiCommand className="w-3.5 h-3.5" />
                        <span className="font-mono">Search</span>
                        <kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-mono text-[10px] border border-gray-700">
                            ⌘K
                        </kbd>
                    </button>

                    <a
                        href="https://github.com/Haslab-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                        aria-label="GitHub Profile"
                    >
                        <FiGithub className="w-4 h-4" />
                    </a>
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center space-x-2">
                    <LangSwitch />
                    <button
                        onClick={triggerPalette}
                        className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300"
                        aria-label="Search"
                    >
                        <FiCommand className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-800 bg-gray-950 px-6 py-4 space-y-3 font-mono text-sm">
                    <a
                        href="/project"
                        className="block text-gray-300 hover:text-white py-1"
                        onClick={() => setMobileOpen(false)}
                    >
                        → Projects
                    </a>
                    <a
                        href="/layanan"
                        className="block text-gray-300 hover:text-white py-1"
                        onClick={() => setMobileOpen(false)}
                    >
                        → Layanan
                    </a>
                    <a
                        href="/labs"
                        className="block text-emerald-400 hover:text-emerald-300 py-1 flex items-center justify-between"
                        onClick={() => setMobileOpen(false)}
                    >
                        <span>→ AI Labs</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                            3D
                        </span>
                    </a>
                    <a
                        href="/blog"
                        className="block text-gray-300 hover:text-white py-1"
                        onClick={() => setMobileOpen(false)}
                    >
                        → Writings
                    </a>
                    <a
                        href="/social"
                        className="block text-emerald-400 hover:text-emerald-300 py-1"
                        onClick={() => setMobileOpen(false)}
                    >
                        → Social
                    </a>
                    <a
                        href="/about"
                        className="block text-gray-300 hover:text-white py-1"
                        onClick={() => setMobileOpen(false)}
                    >
                        → About
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
