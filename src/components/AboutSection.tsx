import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animHelper";
import {FiGithub, FiLinkedin, FiTwitter, FiMail} from "react-icons/fi";

const AboutSection = () => {

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      viewport={{ once: true }}
      className="py-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        <span className="text-white">About </span>
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Me
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a Full Stack Developer who started my journey in college by
              tinkering with Arduino and C++. Originally trained as an
              Electrical Engineer, my career shifted gears in 2020 when I
              decided to focus on web development, especially using Laravel.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Since joining my current workplace, I wear multiple hats as a
              researcher and lead developer in Full Stack and Blockchain
              projects. I'm well-versed in various programming languages and
              frameworks.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Right now, I mainly work with Typescript for projects and use
              Flutter for mobile development. I've also completed a QA Bootcamp
              at Binar, a well-known institution in Indonesia.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a perpetual learner, always excited to explore new
              technologies and expand my skills.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Let's Connect</h3>
          <div className="flex space-x-4">
            <a
              target="_blank"
              href="https://github.com/lutfi-haslab"
              className=" p-3 bg-gray-800 rounded-lg hover:bg-emerald-500 transition-colors"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/lutfi-ikbal-majid-044184172/"
              className="p-3 bg-gray-800 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="https://x.com/lutfiikbal21"
              className="p-3 bg-gray-800 rounded-lg hover:bg-sky-500 transition-colors"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
            <a
              href="mailto:lutfiikbalmajid2@gmail.com"
              className="p-3 bg-gray-800 rounded-lg hover:bg-red-500 transition-colors"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <h4 className="font-semibold mb-3">Current Focus</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Blockchain Development</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Web3 Applications</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Mobile Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
