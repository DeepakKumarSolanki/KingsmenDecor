/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-.025em",
      normal: "0",
      wide: ".025em",
      wider: ".05em",
      widest: ".1em",
      widest: "0.35em",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "48px",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "4.0rem",
      "7xl": "5.0rem",
      "8xl": "9.0rem",
    },
    fontFamily: {
      heading: ['"Titillium Web"', "sans-serif"],
      subheading: ["Raleway", "sans-serif"],
    },

    // colors: {
    //   primary : '#104438'
    // },
    extend: {},
  },
};
