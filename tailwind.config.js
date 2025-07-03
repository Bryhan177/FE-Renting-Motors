/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0a', // Negro profundo brillante
          light: '#eaf1ff',
          'dark-light': 'rgba(67,97,238,.15)',
        },
        // primary: {
        //   DEFAULT: '#1a1a1a', // Negro más brillante, sin llegar a gris
        //   light: '#eaf1ff',
        //   'dark-light': 'rgba(67,97,238,.15)',
        // },
        secondary: {
          DEFAULT: '#ffc107', // Amarillo vibrante (tipo dorado)
          light: '#fff8e1',   // Amarillo clarito, ideal para fondos
          'dark-light': 'rgba(255,193,7,0.15)', // Amarillo translúcido para efectos
        }
      },
    },
  },
  plugins: [],
}

