// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { role, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/properties', label: 'Properties' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
   <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-orange-400 text-white shadow-md z-50 animate-slideDown transition-all duration-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-purple-600 via-blue-500 to-orange-500 bg-clip-text"
        >
          FindMyHome
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center font-semibold text-white text-l">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={`hover:text-purple-600 transition duration-200 ${
                location.pathname === link.to ? 'text-purple-700 font-bold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}

          {role === 'seller' && (
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition"
            >
              + Add Property
            </Link>
          )}
<Link to="/favorites">Favorites</Link>

          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600 font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-purple-700">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 font-medium bg-white text-gray-800 animate-fadeInDown">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={`block py-1 hover:text-purple-600 transition ${
                location.pathname === link.to ? 'text-purple-700 font-bold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}

          {role === 'seller' && (
            <Link
              to="/add"
              onClick={closeMenu}
              className="block py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-center font-semibold hover:from-purple-700 hover:to-blue-600 transition"
            >
              + Add Property
            </Link>
          )}

          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="text-red-500 hover:text-red-600 block font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
