import React from 'react';
import { FiGithub } from 'react-icons/fi';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-gray-900 bg-gray-950 py-12 text-gray-400 font-sans text-xs">
            <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="font-mono text-gray-300">
                        Lutfi Ikbal Majid — Software Developer & Systems Builder
                    </span>
                </div>

                <div className="flex items-center space-x-6 font-mono text-gray-400">
                    <a href="/project" className="hover:text-white transition-colors">Projects</a>
                    <a href="/blog" className="hover:text-white transition-colors">Writings</a>
                    <a href="/about" className="hover:text-white transition-colors">About</a>
                    <a
                        href="https://github.com/Haslab-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors flex items-center space-x-1"
                    >
                        <FiGithub className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
