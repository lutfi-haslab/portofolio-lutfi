import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { fadeIn } from "../utils/animHelper";

const HeroSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      viewport={{ once: true }}
      className="min-h-[80vh] flex flex-col justify-center"
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <TypeAnimation
            sequence={[
              "Hello!",
              1000,
              "I'm Lutfi Ikbal Majid",
              2000,
              "Full Stack Developer",
              1000,
              "Mobile Developer",
              1000,
              "Blockchain Developer",
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          />
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-400 mb-8">
          <TypeAnimation
            sequence={[
              "ReactJS",
              1000,
              "Typescript",
              1000,
              "NextJS",
              1000,
              "NestJS",
              1000,
              "Flutter",
              1000,
              "Golang",
              1000,
              "Rust",
              1000,
              "Quality Assurance",
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"
          />
        </h2>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8">
          I build exceptional digital experiences with modern technologies.
          Currently focused on blockchain and full-stack development.
        </p>

        <div className="flex space-x-4">
          <a
            href="#contact"
            className="text-white hover:text-black px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Contact Me
          </a>
          <a
            href="#projects"
            className="hover:text-white px-6 py-3 border border-emerald-400 text-emerald-400 rounded-lg font-medium hover:bg-emerald-400/10 transition-colors"
          >
            View Projects
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
