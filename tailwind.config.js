const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "full-md": "0 0 6px -1px rgb(0 0 0 / 0.1)",
        "full-lg": "0 0 30px 5px rgb(0 0 0 / 0.25)",
      },
      colors: {
        "green-vogue": "#02274f",
        supernova: "#fdcf00",
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        18: "4.5rem",
        30: "7.5rem",
        35: "8.75rem",
        68: "17rem",
        88: "22rem",
        112: "28rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
