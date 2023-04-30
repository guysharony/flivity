/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    color: {
      primary: "rgb(30, 64, 175)",
    },
    fontFamily: {
      display: ["sans-serif"],
      body: ["sans-serif"],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
