/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        move: "move 160s ease infinite",
      },
      keyframes: {
        move: {
          "0%": { "margin-left": "0" },
          "100%": { "margin-left": "-5746px" },
        },
      },
      height: {
        box: "452px",
      },
    },
  },
  plugins: [],
};
