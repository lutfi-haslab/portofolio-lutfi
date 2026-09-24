import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiSearch, 
    FiCpu, 
    FiBookOpen, 
    FiArrowRight, 
    FiX 
} from 'react-icons/fi';

interface Item {
    id: string;
    title: string;
    description: string;
    category: 'Work' | 'Writing';
    url: string;
    badge?: string;
}

const ITEMS: Item[] = [
    // Work
    {
        id: 'w-1',
        title: 'KendaliAI',
        description: 'Autonomous AI Agent Orchestration Platform & Control Center',
        category: 'Work',
        url: '/project/kendaliai',
        badge: 'Featured',
    },
    {
        id: 'w-2',
        title: 'ForgeADE',
        description: 'Native AI-First Development Workspace (Go + Wails + React)',
        category: 'Work',
        url: '/project/forgeade',
        badge: 'Desktop',
    },
    {
        id: 'w-3',
        title: 'Timenotes',
        description: 'Intelligent high-density time tracking & calendar suite',
        category: 'Work',
        url: '/project/timenotes',
        badge: 'Web App',
    },
    {
        id: 'w-4',
        title: 'MyAiRouter',
        description: 'High-performance Go AI gateway & proxy router',
        category: 'Work',
        url: '/project/myairouter',
        badge: 'Systems',
    },
    {
        id: 'w-5',
        title: 'HasLab Face Recognition System',
        description: 'Real-time face detection & liveness anti-spoofing',
        category: 'Work',
        url: '/project/haslab-face-recognition-system',
    },
    // Writings
    {
        id: 'b-1',
        title: 'Golang and Web Frameworks',
        description: 'Exploring Gin, Fiber, Performance, and Language Comparisons',
        category: 'Writing',
        url: '/blog/2025-06-04-golang-and-web-frameworks',
    },
    {
        id: 'b-2',
        title: 'Vibe Coding: The Programming Revolution Taking 2025 by Storm',
        description: 'How AI agent pairing transforms software engineering workflows',
        category: 'Writing',
        url: '/blog/2025-06-23-vibe-coding-the-programming-revolution-taking-2025-by-storm',
    },
    {
        id: 'b-3',
        title: 'Build Smart Contract REST API',
        description: 'Building REST API using Truffle and Tomochain',
        category: 'Writing',
        url: '/blog/build-smart-contract-api',
    },
    {
        id: 'b-4',
        title: 'Docker and Docker Compose: Practical Guide',
        description: 'Container fundamentals and multi-service development',
        category: 'Writing',
        url: '/blog/docker-and-docker-compose-a-practical-guide-for-modern-software-engineering',
    },
    {
        id: 'b-5',
        title: 'Mastering Git: Meaningful Commit Messages',
        description: 'Conventions and principles for clear commit histories',
        category: 'Writing',
        url: '/blog/mastering-git-writing-meaningful-commit-messages',
    },
    {
        id: 'b-6',
        title: 'Analyze and Clean Disk Space on macOS',
        description: 'Inspecting storage using ncdu and df utilities',
        category: 'Writing',
        url: '/blog/how-to-analyze-and-clean-disk-space-on-macos-using-ncdu-and-df',
    },
    {
        id: 'b-7',
        title: 'Introduction to Astro',
        description: 'Zero JS by default web architecture overview',
        category: 'Writing',
        url: '/blog/introduction-to-astro',
    },
    {
        id: 'b-8',
        title: 'Rich Text Editor for React or NextJS',
        description: 'Demo of how to use Slate.js for rich text editing',
        category: 'Writing',
        url: '/blog/rich-text-editor-for-react',
    },
    {
        id: 'b-9',
        title: 'Unlocking the Fast Lane: Accelerate Your Programming Journey',
        description: 'Learn to code faster with essential engineering strategies',
        category: 'Writing',
        url: '/blog/unlocking-fastlane-programming-journey',
    },
];

export const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            } else if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        const handleCustomOpen = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-command-palette', handleCustomOpen);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-command-palette', handleCustomOpen);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setSelectedIndex(0);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    const filtered = ITEMS.filter((item) => {
        const q = query.toLowerCase();
        return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        );
    });

    const handleSelect = (url: string) => {
        setIsOpen(false);
        window.location.href = url;
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        } else if (e.key === 'Enter' && filtered[selectedIndex]) {
            e.preventDefault();
            handleSelect(filtered[selectedIndex].url);
        }
    };

    const getIcon = (cat: Item['category']) => {
        switch (cat) {
            case 'Work':
                return <FiCpu className="text-emerald-400" />;
            case 'Writing':
                return <FiBookOpen className="text-purple-400" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="relative w-full max-w-2xl bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden font-sans z-10"
                    >
                        {/* Search Input Bar */}
                        <div className="flex items-center px-4 py-3.5 border-b border-gray-800/80 bg-gray-900/60">
                            <FiSearch className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                onKeyDown={handleInputKeyDown}
                                placeholder="Search projects and writings..."
                                className="w-full bg-transparent text-white placeholder-gray-500 text-sm md:text-base focus:outline-none"
                            />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 text-gray-500 hover:text-gray-300 rounded"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
                            {filtered.length === 0 ? (
                                <div className="py-8 text-center text-gray-500 text-sm">
                                    No records found matching "{query}"
                                </div>
                            ) : (
                                filtered.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelect(item.url)}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                                            idx === selectedIndex
                                                ? 'bg-gray-800/90 text-white'
                                                : 'text-gray-300 hover:bg-gray-900'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3 min-w-0">
                                            <div className="p-2 rounded-lg bg-gray-900 border border-gray-800 shrink-0">
                                                {getIcon(item.category)}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold text-sm text-gray-100 truncate">
                                                        {item.title}
                                                    </span>
                                                    {item.badge && (
                                                        <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold tracking-wider rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400 truncate">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 shrink-0 ml-3">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase px-1.5 py-0.5 bg-gray-900 rounded border border-gray-800">
                                                {item.category}
                                            </span>
                                            <FiArrowRight className="w-3.5 h-3.5 text-gray-500" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Tips */}
                        <div className="px-4 py-2.5 bg-gray-900/80 border-t border-gray-800 text-[11px] font-mono text-gray-400 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span><kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↑↓</kbd> navigate</span>
                                <span><kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↵</kbd> select</span>
                                <span><kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">esc</kbd> close</span>
                            </div>
                            <span className="text-emerald-400 font-medium">Lutfi</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
