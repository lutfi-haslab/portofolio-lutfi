import { motion } from "framer-motion";
import { fadeIn } from "../utils/animHelper";
import BlogComponent, { type BlogItemFeed } from "./BlogComponent";

const BlogSection = ({ blogs }: { blogs: BlogItemFeed[] }) => {
  return (
    <motion.section
      id="blog"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      viewport={{ once: true }}
      className="py-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="text-white">Latest </span>
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Articles
        </span>
      </h2>
      <p className="text-gray-400 mb-12 max-w-2xl">
        Thoughts on development, technology, and my learning journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs
          ?.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 6)
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-emerald-400/30 transition-colors"
            >
              <BlogComponent item={item} />
            </motion.div>
          ))}
      </div>

      <div className="mt-12 text-center">
        {/* <Link
          href="blog"
          className="inline-flex items-center px-6 py-3 border border-emerald-400 text-emerald-400 rounded-lg font-medium hover:bg-emerald-400/10 transition-colors"
        >
          View All Articles
        </Link> */}
      </div>
    </motion.section>
  );
};

export default BlogSection;
