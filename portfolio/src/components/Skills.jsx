import React from "react";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Tailwind CSS",
  "Git & GitHub",
  "VS Code",
  "Postman",
  "Firebase"
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-16 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white"
    >
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 text-transparent bg-clip-text">
        Tech Stack & Tools
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative p-6 border border-gray-700 rounded-xl shadow-md text-center transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_#00ffe1] bg-[#141414]"
          >
            <span className="text-xl font-semibold text-cyan-300 group-hover:text-white transition duration-300">
              {skill}
            </span>

            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_#00ffe1] transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
