// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primaryBlack: "#000",
        primaryGray: "#D9D9D9",
        primaryWhite: "#FAFAFA",
        primary: "#DB4444",
        dimWhite: "#F5F5F5",
        darkGray: "#B3B3B3",
        lightGreen: "rgb(37, 197, 94)",
        neutral: "#6C7275",
        gold: "#EFD33D",
        primaryBlue: "#2DA5F3"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};


