
import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Logo & About */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-3">FindMyHome</h2>
          <p className="text-sm text-purple-100">
            Helping you discover your perfect property with ease and trust.
            Search, filter, inquire — all in one seamless platform.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:w-1/3 flex flex-col gap-2">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/properties" className="hover:text-yellow-300">Properties</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
        </div>

        {/* Contact & Social */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm mb-1"><FaEnvelope /> findmyhome@gmail.com</p>
          <p className="flex items-center gap-2 text-sm mb-4"><FaPhoneAlt /> +91 99999 99999</p>
          <div className="flex gap-4 text-2xl">
            <a href="https://instagram.com/findmyhome" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-purple-200">
        © {new Date().getFullYear()} FindMyHome. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer