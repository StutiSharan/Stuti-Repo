import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 px-6 text-gray-800">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-purple-700">About FindMyHome</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Welcome to <span className="font-semibold text-blue-600">FindMyHome</span> – your one-stop solution for buying,
          selling, or renting your dream property. We believe in making real estate hassle-free, transparent, and accessible for everyone.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {[
          {
            title: "Wide Property Listings",
            desc: "We offer a vast database of properties, from budget homes to luxury villas. Find exactly what fits your needs and lifestyle.",
            icon: "🏠",
          },
          {
            title: "Smart Search Tools",
            desc: "Use our intelligent filters, maps, and interactive tours to narrow down your ideal home quickly and accurately.",
            icon: "🔍",
          },
          {
            title: "Verified & Trusted",
            desc: "We list only verified properties and trusted sellers, ensuring a safe experience for both buyers and renters.",
            icon: "✅",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-purple-500"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-700">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions or need assistance? Reach out to us anytime!
        </p>
        <div className="text-lg">
          <p className="mb-2">
            📧 Email:{" "}
            <a
              href="mailto:findmyhome@gmail.com"
              className="text-blue-600 hover:underline"
            >
              findmyhome@gmail.com
            </a>
          </p>
          <p>
            📞 Phone:{" "}
            <a href="tel:+911234567890" className="text-blue-600 hover:underline">
              +91 12345 67890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
