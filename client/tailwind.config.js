/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          deep: '#0F3D3E',
        },
        nude: {
          soft: '#F8EDE3',
        },
        gold: {
          accent: '#D4AF37',
        }
      },
      fontFamily: {
        playfair: ["'Playfair Display'", 'serif'],
        poppins: ["'Poppins'", 'sans-serif'],
      }
    },
  },
  plugins: [],
}
