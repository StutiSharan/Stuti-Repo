import React from "react";

const Footer = () => (
  <footer className="bg-[#0F172A] text-[#CBD5E1] py-6">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
      </p>
      <div className="mt-3 md:mt-0 space-x-4">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#38BDF8] transition-colors duration-200"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#38BDF8] transition-colors duration-200"
        >
          LinkedIn
        </a>
        <a
          href="mailto:youremail@example.com"
          className="hover:text-[#38BDF8] transition-colors duration-200"
        >
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
