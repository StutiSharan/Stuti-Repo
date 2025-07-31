import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Projects", "Contact", "Resume"];

  return (
    <nav className="sticky top-0 z-50 bg-[#0F172A]/95 text-slate-100 shadow-md backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-extrabold text-cyan-400 tracking-tight">
          MyPortfolio
        </h1>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-cyan-400 focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="relative group transition duration-200"
              >
                <span className="group-hover:text-cyan-400">{link}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="md:hidden bg-[#0F172A] px-6 pb-6 pt-2 space-y-3 text-left font-medium"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="block py-2 px-2 rounded-md hover:bg-cyan-600/20 hover:text-cyan-400 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
