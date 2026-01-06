/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      colors: {
        primary: "#020617",      // Main background (deep black)
        secondary: "#020b1c",    // Cards / sidebar
        accent: "#22c55e",       // Banking green
        accentHover: "#16a34a",  // Darker green
        textPrimary: "#e5e7eb",  // Light gray text
        textMuted: "#9ca3af",    // Muted text
        borderDark: "#1f2937",   // Borders
      },

      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
