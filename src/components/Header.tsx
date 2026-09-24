import React, { useState } from 'react';
import { FiCommand, FiGithub, FiMenu, FiX } from 'react-icons/fi';

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
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a
                        href="/project"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Projects
                    </a>
                    <a
                        href="/blog"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Writings
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
                        href="/blog"
                        className="block text-gray-300 hover:text-white py-1"
                        onClick={() => setMobileOpen(false)}
                    >
                        → Writings
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
