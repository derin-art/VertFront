/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        HeadFont: ["HeadFont", "serif"],
        SecFont: ["SecFont", "serif"],
        Berk: ["Berk", "serif"],
        Poppins: ["Poppins", "serif"],
        PlayFair: ["PlayFair", "serif"],
        Noto: ["Noto", "serif"],
        PlayI: ["PlayI", "serif"],
        Notos: ["Notos", "serif"],
        IMFELL: ["IMFELL", "serif"],
        Oswald: ["Oswald", "serif"],
        Grad: ["Grad", "serif"],
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
      },
    },
  },
  plugins: [],
};
