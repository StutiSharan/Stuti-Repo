import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaPhone, FaWhatsapp, FaInstagram } from "react-icons/fa";
import agentImage from "../assets/agent.jpeg"; // Update this path if needed

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation(); // 🔍 Get URL query params

  // 🧠 Auto-fill message if passed in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const messageFromURL = params.get("message");
    if (messageFromURL) {
      setForm((prev) => ({ ...prev, message: messageFromURL }));
    }
  }, [location]);

  // 🧠 Validation logic
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email address";
    if (!phoneRegex.test(form.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setForm((prev) => ({ ...prev, [name]: digitsOnly }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, form);
      setShowPopup(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      triggerConfetti();
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const triggerConfetti = () => {
    import("canvas-confetti").then((confetti) => {
      confetti.default({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    });
  };

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-tr from-indigo-300 via-purple-200 to-orange-100 px-4">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10">Get in Touch</h1>
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
        {/* Agent Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 w-full md:w-1/2 text-center animate-fade-in-up mb-20">
          <img
            src={agentImage}
            alt="Agent"
            className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-purple-500"
          />
          <h2 className="text-2xl font-bold mb-2 text-purple-700">Riya Sharma</h2>
          <p className="text-gray-600 mb-4">Senior Property Advisor</p>
          <div className="flex justify-center gap-6 text-purple-600 text-xl">
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
            <a href="https://instagram.com/findmyhome" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="tel:+919999999999">
              <FaPhone />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-8 w-full md:w-1/2 animate-slide-in mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send an Inquiry</h3>

          {["name", "email", "phone", "message"].map((field) => (
            <div key={field} className="mb-4">
              <input
                type={
                  field === "email" ? "email" : field === "phone" ? "tel" : "text"
                }
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-400"
                }`}
                required
              />
              {errors[field] && (
                <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-md hover:from-indigo-600 hover:to-purple-600 transition duration-300 font-semibold"
          >
            Submit Inquiry
          </button>
        </form>
      </div>

      {/* 🎉 Thank You Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full animate-pop">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">🎉 Thank You!</h2>
            <p className="text-gray-700">
              We've received your inquiry and will contact you soon.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
