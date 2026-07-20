/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:   '#FBF6EE',
        ink:     '#241C17',
        inkSoft: '#5B5049',
        orange:  '#E2933C',
        orangeD: '#C97A2B',
        plum:    '#3A2A24',
        yolk:    '#F5C84C',
        clay:    '#E8A15C',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
