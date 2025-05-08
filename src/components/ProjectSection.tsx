import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { staggerContainer, projectItem } from "../utils/animHelper";
import { myProjects } from "../data/my-projects";


const ProjectSection = () => {
  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      variants={staggerContainer}
      viewport={{ once: true }}
      className="py-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="text-white">Featured </span>
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
      <p className="text-gray-400 mb-12 max-w-2xl">
        Here are some of my recent projects. Each one presented unique
        challenges and learning opportunities.
      </p>

      {/* Featured Project */}
      <motion.div variants={projectItem} className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-xl blur-md group-hover:opacity-80 transition-opacity"></div>
            <img
              src={myProjects[0].img_url}
              alt={myProjects[0].work_title}
              className="relative rounded-xl border border-gray-700 w-full h-auto object-cover transition-transform group-hover:scale-[1.02]"
            />
          </div>
          <div>
            <div className="text-emerald-400 font-mono text-sm mb-2">
              {myProjects[0].type}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {myProjects[0].work_title}
            </h3>
            <p className="text-gray-300 mb-6">{myProjects[0].detail}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {myProjects[0].tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-400/10 transition-colors"
            >
              View Project <FiExternalLink className="ml-2" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Project Grid */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {myProjects.slice(1).map((project, index) => (
          <motion.div
            key={index}
            variants={projectItem}
            whileHover={{ y: -5 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-xl border border-gray-700">
              <img
                src={project.img_url}
                alt={project.work_title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-6 bg-gray-900/80 backdrop-blur-sm">
                <div className="text-emerald-400 font-mono text-sm mb-1">
                  {project.type}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.work_title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.detail}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Learn more <FiExternalLink className="ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProjectSection;
