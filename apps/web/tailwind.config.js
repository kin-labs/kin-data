const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  presets: [require('../../tailwind-workspace-preset.js')],
  purge: [join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'), ...createGlobPatternsForDependencies(__dirname)],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
        brand: {
          light: '#C9B5FD',
          DEFAULT: '#6F41E8',
          dark: '#5728D1',
          100: '#EFEDF5',
          200: '#dcd1f9',
          300: '#C9B5FD',
          400: '#936BFB',
          500: '#6F41E8',
          600: '#6436de',
          700: '#5728D1',
          800: '#411e9d',
          900: '#34187d',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
