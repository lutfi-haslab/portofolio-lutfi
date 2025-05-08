import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [showNavMobile, setShowNavMobile] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <img
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cf51d4614b9df3de0b1afa110d29f9e9e58cabc5721e8169aaf817138c300f87?apiKey=b4b8e1120d4040cb8e27288270221f30&width=100 100w"
            className="w-10 h-10 rounded-full object-cover"
            alt="Profile"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Lutfi Ikbal Majid
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-emerald-400 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">
            About
          </a>
          <a
            href="/project"
            className="hover:text-emerald-400 transition-colors"
          >
            Projects
          </a>
          <a href="/blog" className="hover:text-emerald-400 transition-colors">
            Blog
          </a>
          <a
            href="/knowledge-base"
            className="hover:text-emerald-400 transition-colors"
          >
            Knowledge Base
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setShowNavMobile(!showNavMobile)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {showNavMobile ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {showNavMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 py-4 border-t border-gray-800"
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#home"
              className="hover:text-emerald-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-emerald-400 transition-colors"
            >
              About
            </a>
            <a
              href="/project"
              className="hover:text-emerald-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="/blog"
              className="hover:text-emerald-400 transition-colors"
            >
              Blog
            </a>
            <a
              href="/knowledge-base"
              className="hover:text-emerald-400 transition-colors"
            >
              Knowledge Base
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
