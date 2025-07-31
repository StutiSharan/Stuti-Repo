import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="py-16 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white"
    >
      <div className="max-w-4xl mt-10 mx-auto bg-[#141414] p-10 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-4xl  font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 text-transparent bg-clip-text">
          About Me
        </h2>

        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          I’m a <span className="text-cyan-300 font-medium">Full Stack Developer</span> with strong knowledge of <span className="text-cyan-300 font-medium">React.js, Node.js, Express.js, MongoDB and HTML/CSS.</span>. I’m passionate about building user-friendly, scalable, and modern web apps that solve real-world problems.
        </p>

        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          I led a team during a major <span className="text-cyan-300 font-medium">hackathon project at MASAI</span>, where we developed a full-fledged application under tight deadlines. I value <span className="text-cyan-300 font-medium">teamwork</span>, clean architecture, and constant learning.
        </p>

       
      </div>
    </section>
  );
};

export default About;
