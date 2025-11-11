export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#1E2A45',
        yellow: '#F8C538',
        lightGray: '#E7ECEF',
        charcoal: '#1A1A1A',
        lost: '#EF4444',
        found: '#10B981',
        primary: '#1E2A45',
        accent: '#F8C538',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
