const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kalnia', 'serif'], // Mantén tu fuente existente
        lato: ['Lato', 'sans-serif'], // Define la nueva fuente
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
