import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animHelper";

const ContactSection = () => {
  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      viewport={{ once: true }}
      className="py-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="text-white">Get In </span>
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Touch
        </span>
      </h2>

      <div className="max-w-2xl mx-auto bg-gray-800/50 rounded-xl border border-gray-700 p-8">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default ContactSection;
