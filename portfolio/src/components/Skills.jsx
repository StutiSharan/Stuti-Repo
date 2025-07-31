import React from "react";

const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"];
const tools = ["VS Code", "Git", "GitHub", "Postman"];

const Skills = () => (
  <section id="skills" className="py-16 px-6 text-center">
    <h2 className="text-2xl font-bold text-accent mb-8">Tech Stack & Tools</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
      {skills.map(skill => <div key={skill} className="bg-secondary py-4 rounded">{skill}</div>)}
      {tools.map(tool => <div key={tool} className="bg-secondary py-4 rounded">{tool}</div>)}
    </div>
  </section>
);

export default Skills;
