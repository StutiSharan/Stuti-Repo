import React from "react";

const Contact = () => (
  <section
    id="contact"
    className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
  >
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 mb-6">
        Contact Me
      </h2>
      <p className="text-lg mb-2">📧 Email: <span className="text-accent">youremail@example.com</span></p>
      <p className="text-lg mb-6">📞 Phone: <span className="text-accent">+91-XXXXXXXXXX</span></p>

      <div className="flex justify-center gap-6 mt-6">
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-pink-600 transition px-6 py-3 rounded-xl text-white font-medium shadow-lg"
        >
          🔗 LinkedIn
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-purple-600 transition px-6 py-3 rounded-xl text-white font-medium shadow-lg"
        >
          💻 GitHub
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
