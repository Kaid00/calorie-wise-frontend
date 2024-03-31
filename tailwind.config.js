/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        Montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        chaletGreen: "#4d6333",
        lightGreen: "#F3F4EE",
        springWood: "#f4f0e7",
        orangeRoughy: "#d95717",
      },
    },
  },
  plugins: [],
};
