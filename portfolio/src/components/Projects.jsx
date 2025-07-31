import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Real Estate App",
    image: "https://via.placeholder.com/300x200",
    description: "A full-stack real estate platform for buying, selling, and renting properties.",
    tech: "React, Node.js, MongoDB, Tailwind CSS",
    github: "https://github.com/your/repo",
    demo: "https://yourproject.live",
  },
  {
    title: "Meme Generator",
    image: "https://via.placeholder.com/300x200",
    description: "Generate and share memes with others using templates.",
    tech: "React, Express, Cloudinary",
    github: "https://github.com/your/meme",
    demo: "https://memegen.live",
  },
  {
    title: "Voting System",
    image: "https://via.placeholder.com/300x200",
    description: "Secure online voting platform with real-time results.",
    tech: "React, Firebase, Tailwind CSS",
    github: "https://github.com/your/vote",
    demo: "https://votingsys.live",
  },
  {
    title: "Portfolio Website",
    image: "https://via.placeholder.com/300x200",
    description: "My personal portfolio website to showcase projects and skills.",
    tech: "React, Tailwind, Framer Motion",
    github: "https://github.com/your/portfolio",
    demo: "https://yourname.live",
  },
];

const Projects = () => (
  <section id="projects" className="py-20 px-6 bg-[#0F172A] text-[#E2E8F0]">
    <h2 className="text-3xl md:text-4xl text-center font-bold text-[#38BDF8] mb-12">
      🚀 Projects
    </h2>

    <div className="space-y-16">
      {projects.map((proj, index) => (
        <motion.div
          key={index}
          className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} items-center gap-8 bg-[#1E293B] rounded-2xl p-6 shadow-lg`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={proj.image}
            alt={proj.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-lg"
          />

          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-[#38BDF8] mb-2">{proj.title}</h3>
            <p className="text-[#CBD5E1]">{proj.description}</p>
            <p className="text-sm mt-2 text-[#94A3B8] italic">{proj.tech}</p>
            <div className="mt-4 flex gap-4">
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#38BDF8] text-[#0F172A] rounded-full font-semibold hover:bg-[#0ea5e9] transition"
              >
                GitHub
              </a>
              <a
                href={proj.demo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-transparent border border-[#38BDF8] text-[#38BDF8] rounded-full font-semibold hover:bg-[#38BDF8] hover:text-[#0F172A] transition"
              >
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
