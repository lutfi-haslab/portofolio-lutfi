import React from "react";
import parser, {
  type HTMLReactParserOptions,
  Element,
} from "html-react-parser";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import MiniCover from "../assets/blogging.jpg";

export interface BlogItemFeed {
  link: string;
  content: string;
  title: string;
  editUrl: boolean;
  head: any[];
  template: string;
  sidebar: {
    hidden: boolean;
    attrs: {};
  };
  pagefind: boolean;
  draft: boolean;
  authors: string[];
  date: Date;
  cover?: {
    alt: string;
    image: {
      src: string;
      width: number;
      height: number;
      format: string;
    };
  };
}

const BlogComponent = ({ item }: { item: BlogItemFeed }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name === "img") {
        return (
          <motion.img
            className="object-cover w-full h-48 md:h-64 rounded-t-lg"
            src={domNode.attribs.src as string}
            alt={domNode.attribs.alt || "Blog post image"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        );
      }
      return null;
    },
    trim: true,
  };

  const htmlElements = item
    ? (parser(item.content, options) as React.ReactNode[])
    : [];

  const extractTextContent = (element: React.ReactNode): string => {
    if (typeof element === "string") return element;
    // @ts-ignore
    if (React.isValidElement(element) && element.props.children) {
      // @ts-ignore
      return React.Children.toArray(element.props.children)
        .map((child) => extractTextContent(child))
        .join("");
    }
    return "";
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const firstParagraph =
    htmlElements.length > 0 ? extractTextContent(htmlElements[0]) : "";
  const secondParagraph =
    htmlElements.length > 1 ? extractTextContent(htmlElements[1]) : "";

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-emerald-400/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Blog Image */}
      {item.cover ? (
        <div className="overflow-hidden">
          <img src={item.cover.image.src} alt={item.cover.alt} />
        </div>
      ) : (
        <div className="overflow-hidden">
          <img src={MiniCover.src} alt="" />
        </div>
      )}
      {/* Blog Content */}
      <div className="p-6">
        <a
          href={`/${item.link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
            {item.title}
          </h3>
        </a>

        {/* Excerpt */}
        <div className="space-y-3 mb-4">
          {firstParagraph && (
            <p className="text-gray-300">{truncateText(firstParagraph)}</p>
          )}
          {secondParagraph && (
            <p className="text-gray-400 text-sm">
              {truncateText(secondParagraph, 100)}
            </p>
          )}
        </div>

        {/* Read More */}
        <div className="flex justify-between items-center mt-6">
          <a
            href={`/${item.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Read more <FiArrowRight className="ml-2" />
          </a>
        </div>

        {/* Footer with Meta Info */}
        <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
              <FiUser className="text-gray-400" />
            </div>
            {item.authors.map((author, index) => (
              <div className="text-sm" key={index}>
                <p className="text-gray-300">{author}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <FiCalendar className="mr-2" />
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogComponent;
