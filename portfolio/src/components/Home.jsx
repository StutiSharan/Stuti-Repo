import React from "react";
import profile from "../assets/profile.jpg";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { SiReact, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";

const Home = () => (
<section
  id="home"
  className="relative min-h-screen flex flex-col items-center justify-center text-center bg-[#0F172A] text-[#E2E8F0] px-4 overflow-hidden"
>
  {/* 🌟 Glowy Animated Code Background */}
  <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
    <div className="w-full h-full animate-pulse opacity-100 blur-sm">
      <pre className="text-xs md:text-sm text-[#38BDF8] font-mono whitespace-pre-wrap leading-relaxed glow-effect px-4 py-10">
{`const greet = (name) => {
  return \`Hello, \${name}! Welcome to my portfolio 🚀\`;
};

const techStack = ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'];

for (let tech of techStack) {
  console.log(\`🔧 Working with: \${tech}\`);
}
`}
      </pre>
    </div>
  </div>
    {/* Glowing gradient overlays */}
    <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#38BDF8] rounded-full opacity-20 blur-3xl animate-pulse z-0" />
    <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#0ea5e9] rounded-full opacity-20 blur-3xl animate-pulse z-0" />

    {/* Profile Image */}
    <motion.img
      src={profile}
      alt="Profile"
      className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-[#38BDF8] shadow-lg z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    />

    {/* Name & Typewriter */}
    <motion.h2
      className="text-4xl sm:text-5xl font-extrabold mt-6 text-[#38BDF8] z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Hi, I'm <span className="text-white">Your Name</span>
    </motion.h2>

    <motion.p
      className="mt-2 text-lg sm:text-xl font-medium z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Typewriter
        words={[
          "Full Stack Developer",
          "React & Node.js Enthusiast",
          "UI/UX Designer",
          "Problem Solver 💡",
        ]}
        loop
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </motion.p>

    {/* Intro Paragraph */}
    <motion.p
      className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#CBD5E1] z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      I’m passionate about crafting scalable web applications and engaging user experiences using modern technologies like React, Tailwind CSS, Node.js, and MongoDB.
    </motion.p>

    {/* Resume Button */}
    <motion.a
      href="/resume.pdf"
      download
      className="inline-block mt-6 px-6 py-3 rounded-full bg-[#38BDF8] text-[#0F172A] font-semibold hover:bg-[#0ea5e9] transition-colors duration-300 shadow-lg z-10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      📄 Download Resume
    </motion.a>

    {/* Tech Stack Icons */}
    <motion.div
      className="flex items-center justify-center gap-6 mt-10 text-4xl text-[#38BDF8] z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <SiReact title="React" />
      <SiTailwindcss title="Tailwind CSS" />
      <SiNodedotjs title="Node.js" />
      <SiMongodb title="MongoDB" />
    </motion.div>
  </section>
);

export default Home;