import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Property Listing Platform",
    image: "/property.png",
    description: "A full-stack real estate platform for buying, selling, and renting properties.",
    tech: "React, Node.js, MongoDB, Tailwind CSS",
    github: "https://github.com/StutiSharan/Stuti-Repo/tree/main/Property%20Listing",
    demo: "https://findmyhome41.netlify.app/",
  },
  {
    title: "MemeHub- Joke Junction",
    image: "/meme.png",
    description: "Generate and share memes with others using templates and create own templates.",
    tech: "React, Tailwind CSS, firebase RealtimeDB",
    github: "https://github.com/StutiSharan/MemeHub-Project-",
    demo: "https://jokejunction-41.netlify.app/",
  },
  {
    title: "Voting System",
    image: "/voting app.png",
    description: "Secure online voting platform with real-time results.",
    tech: "React, Tailwind CSS, Firebase Realtime DB",
    github: "https://github.com/StutiSharan/voting-system",
    demo: "https://voting-app-41.netlify.app/",
  },
  {
    title: "Community Platform",
    image: "/community 1.png",
    description: "User can join Community based on their Interest also users can post anything,do like and comments on other's post.",
    tech: "HTML, CSS, Javascript, Firebase , LocalStorage",
    github: "https://github.com/StutiSharan/community-Platform",
    demo: "https://community-41.netlify.app/",
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
