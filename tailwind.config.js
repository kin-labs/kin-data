const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./apps/**/*.{html,ts,css}', './libs/**/*.{html,ts,css}'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        primary: colors.indigo,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
