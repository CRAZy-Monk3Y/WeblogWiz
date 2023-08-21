/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dark: "#1a202c", // Dark theme background color
      },
      textColor: {
        dark: "#ffffff", // Dark theme text color
      },
    },
  },
  plugins: [],
};
