// App.jsx or MainPage.jsx
import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Home from './components/Home';
import GitHubStats from './components/GitHubStats';

function App() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

<section id="projects">
        <GitHubStats/>
      </section>
      <section id="contact">
        <Contact />
      </section>

      <section id="resume">
        {/* Resume section if needed */}
      </section>
    </div>
  );
}

export default App;
