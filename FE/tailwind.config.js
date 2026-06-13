/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10B981",
          dark: "#059669",
          deep: "#047857",
          light: "#34D399",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          container: "#FFFFFF",
          dim: "#F1F5F9",
        },
        secondary: "#64748B",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.5rem",
      },
      boxShadow: {
        premium:
          "0 4px 20px -2px rgba(16, 185, 129, 0.05), 0 2px 10px -1px rgba(0, 0, 0, 0.03)",
        button:
          "0 18px 38px -22px rgba(4, 120, 87, 0.8), 0 8px 18px -16px rgba(15, 23, 42, 0.4)",
      },
    },
  },
  plugins: [],
};
