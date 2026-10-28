module.exports = {
  content: ['./index.html', './components/**/*.{ts,tsx}', './*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        brand: {
          primary: '#1e40af',
          'primary-dark': '#1e3a8a',
          secondary: '#f59e0b',
          'secondary-dark': '#d97706',
          light: '#fffbeb',
        },
      },
    },
  },
  plugins: [],
};
