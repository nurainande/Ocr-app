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
          100: "#5a4fcf",
          200: "#4e43c2",
          300: "#4236b5",
          400: "#362aa8",
          500: "#2a1e9b",
          600: "#1e1390",
          700: "#120885",
          800: "#06007a",
          900: "#00006f"
        },
        secondary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827"
        },
        success:{
          100:"#dcfce7",
          200:"#bbf7d0",
          300:"#86efac",
          400:"#4ade80",
          500:"#22c55e",
          600:"#16a34a",
          700:"#15803d",
          800:"#166534",
          900:"#14532d"
        },
        danger:{
          100:"#fee2e2",
          200:"#fecaca",
          300:"#fca5a5",
          400:"#f87171",
          500:"#ef4444",
          600:"#dc2626",
          700:"#b91c1c",
          800:"#991b1b",
          900:"#7f1d1d"
        }
        ,
        pawpaw:{
          100:"#fef9c3",
          200:"#fef08a",
          300:"#fde047",
          400:"#facc15",
          500:"#eab308",
          600:"#ca8a04",
          700:"#a16207",
          800:"#854d0e",
          900:"#713f12"
        }
         
        ,
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
