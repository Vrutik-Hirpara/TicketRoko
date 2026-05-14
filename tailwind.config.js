/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        black: "#111827",
        white: "#FFFFFF",
        "gray-50": "#F9FAFB",
        "gray-100": "#F3F4F6",
        "gray-200": "#E5E7EB",
        "gray-300": "#D1D5DB",
        "gray-400": "#9CA3AF",
        "gray-500": "#6B7280",
      },
    },
  },
  plugins: [],
};