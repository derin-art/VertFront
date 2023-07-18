/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SecFont: ["SecFont", "serif"],
        Berk: ["Berk", "serif"],

        PlayI: ["PlayI", "serif"],

        Inter: ["Inter", "sans"],
        Wagon: ["Wagon", "serif"],
        Armate: ["Armate", "serif"],
      },
      colors: {
        MikYellow: "#FEC601",
        ForBlack: "#06080F",
        PhaBlue: "#020887",
        PigBlue: "#38369A",
        PineGreen: "#0B7A75",
        SmoBlack: "#12100E",
        ChiViolet: "#856084",
        PinkLav: "#D4ADCF",
        TiWhite: "#fafafa",
        DarkPine: "#002626",
        LauGreen: "#92AD94",
        AltBlack: "#0A090C",
      },
    },
  },
  plugins: [],
};
