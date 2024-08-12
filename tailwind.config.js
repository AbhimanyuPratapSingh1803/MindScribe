/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'pattern': "linear-gradient(#292a30 0.1em, transparent 0.1em), linear-gradient(90deg, #292a30 0.1em, transparent 0.1em)"
      }),
      fontFamily : ["Inter", "sans-serif"],
      fontFamily : ["Poppins", "sans-serif"],
    },
  },
  plugins: [require('daisyui'),],
}

