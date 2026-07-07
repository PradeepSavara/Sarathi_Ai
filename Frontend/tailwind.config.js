/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        premium: "20px",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.10)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(37, 99, 235, 0.18)",
      },
      colors: {
        ink: "#111827",
        canvas: "#F6F8FC",
        primary: {
          light: "#2563EB",
          dark: "#3B82F6",
        },
      },
    },
  },
  plugins: [],
};
