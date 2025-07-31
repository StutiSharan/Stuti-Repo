/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // dark blue
        accent: '#10B981',  // emerald
        secondary: '#F59E0B', // amber
        background: '#F3F4F6', // light gray
      },
       boxShadow: {
    glow: "0 0 20px rgba(56, 189, 248, 0.4)",
  },
    },
    
  },
  plugins: [],
}
