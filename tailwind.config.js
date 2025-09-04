/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5a4fcf",
          light: "#4e43c2",
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          light: "#374151", //light-700
          lighter: "#9ca3af", //lighter
        },
        success:{
          DEFAULT:"#22c55e",
          light:"#15803d", //light-700
          lighter:"#dcfce7", //light-100
        },
        error:{
          DEFAULT:"#fee2e2",
          lighter:"#f87171",
          light:"#b91c1c",
        },
        light: "#ffffff",
        dark: "#000000"
      },
      
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
