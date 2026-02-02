import React from "react";
import { motion } from "framer-motion";

const companies = [
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
];

export default function Hero() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
  };

  const line = {
    hidden: { opacity: 0, y: 30, scale: 1.2 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const features = ["Code", "Plan", "Collaborate", "Automate", "Secure"];

  const commonBg = "linear-gradient(180deg, #040641)"; // consistent background

  return (
    <div style={{ background: commonBg }}>
      {/* Hero Section */}
      <section
        className="text-center relative flex flex-col items-center justify-center py-16 px-4"
        style={{
          background: `linear-gradient(180deg, #030417, #080B41, #0D1168, #121891, #171FBA, #1C26E3, #454DE8, #6E74ED, #979BF2)`,
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight overflow-hidden font-inter"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="block" variants={line}>
            Build and ship software
          </motion.span>
          <motion.span className="block" variants={line}>
            on a single, collaborative platform
          </motion.span>
        </motion.h1>

        <p className="mt-4 text-lg text-gray-300">
          Join the world’s most widely adopted AI-powered developer platform.
        </p>

        {/* Email Signup */}
        <div className="flex justify-center mt-8 gap-3 flex-wrap px-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md text-black w-72 border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="px-6 py-3 bg-green-600 rounded-md text-white font-semibold hover:bg-green-700 transition">
            Sign up for GitHub
          </button>
          <button className="px-6 py-3 border border-gray-600 rounded-md text-white hover:bg-gray-800 transition">
            Try GitHub Copilot
          </button>
        </div>

        {/* Video Frame */}
        <div className="flex justify-center mt-20 px-4 w-full">
          <div
            className="rounded-3xl overflow-hidden p-5"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "2rem",
              border: "12px solid rgba(110, 116, 237, 0.8)",
              width: "95%",
              maxWidth: "1200px",
              backdropFilter: "blur(4px)",
            }}
          >
            <video
              src="https://github.githubassets.com/assets/code-1_desktop-7ab52aea3358.mp4"
              autoPlay
              loop
              muted
              controls={false}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="flex justify-center px-4"
        style={{ background: commonBg, padding: "1.5rem 0" }}
      >
        <div className="flex flex-wrap gap-6 justify-center p-4 border border-gray-600 rounded-2xl" style={{ maxWidth: "900px" }}>
          {features.map((feature, idx) => (
            <button
              key={idx}
              className="px-6 py-2 rounded-full border border-gray-600  text-white font-semibold 
                         hover:bg-white hover:text-[#1C26E3] hover:scale-105 transition transform duration-300"
            >
              {feature}
            </button>
          ))}
        </div>
      </section>

      {/* Info Text Section */}
      <section className="text-gray-500 py-5 px-4 text-center" style={{ background: commonBg }}>
        <p className="text-l max-w-xl mx-auto">
          <span className="text-gray font-semibold">Code</span> quickly and more securely with GitHub Copilot embedded throughout your workflows.
        </p>
      </section>

      {/* Moving Companies Section */}
      <section className="py-8 overflow-hidden" style={{ background: commonBg }}>
        <div className="relative">
          <motion.div
            className="flex gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" }}
          >
            {companies.concat(companies).map((company, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center w-36">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-16 md:h-20 object-contain mb-2 filter brightness-75"
                />
                <span className="text-gray-400 text-sm md:text-base">{company.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
