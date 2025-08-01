import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact', 'Resume'];

  return (
    <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-cyan-500">Stuti's Portfolio</div>
        <div className="hidden md:flex text-m font-bold space-x-6">
          {links.map((link) =>
            link === 'Resume' ? (
              <a
                key={link}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 text-white transition-colors duration-200"
              >
                {link}
              </a>
            ) : (
              <Link
                key={link}
                to={link.toLowerCase()}
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer text-white hover:text-cyan-400 transition-colors duration-200"
              >
                {link}
              </Link>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <div className="text-white font-bold text-m md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden w-full text-cyan  bg-white/10 backdrop-blur-md px-4 pb-4 space-y-3">
          {links.map((link) =>
            link === 'Resume' ? (
              <a
                key={link}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 px-2 text-white rounded-md hover:bg-cyan-600/20 hover:text-cyan-400 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ) : (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block py-2 px-2 rounded-md text-white hover:bg-cyan-600/20 hover:text-cyan-400 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById(link.toLowerCase());
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                  setMenuOpen(false);
                }}
              >
                {link}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
