/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      flexBasis: {
        '1/10': '10%', // Custom flex-basis utility class
      }, screens: {
        'h-700': {'raw': '(min-height: 700px)'},
      },
    },
  },
  variants: {
    extend: {
     
    },
  },
  plugins: [require("daisyui")],
};