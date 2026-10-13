/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:   '#FBF4EE',
        ink:     '#2B1713',
        inkSoft: '#5B4A44',
        orange:  '#E2933C',
        orangeD: '#C97A2B',
        // texto pequeno sobre fundo claro: orangeD fica abaixo de 4.5:1 de contraste
        bronze:  '#9A5516',
        plum:    '#3A2420',
        yolk:    '#F5C84C',
        clay:    '#E8A15C',
        // paleta "padaria divertida": amarelo-limão, coral e pastéis
        brand:   '#C60C0C', // vermelho da logo
        sun:     '#FFDD4A',
        coral:   '#F2683C',
        sky:     '#A9D6DE',
        skyInk:  '#0D4F5C',
        peach:   '#FAD8BE',
        lilac:   '#DACFF7',
        blush:   '#F9C8BA',
        mint:    '#CBE8D4',
        leaf:    '#1F7A50',
        sand:    '#EFD9B8',
      },
      fontFamily: {
        display: ['"Londrina Solid"', '"Arial Narrow"', 'Impact', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        pop: '4px 4px 0 #2B1713',
        card: '0 1px 2px rgba(43, 23, 19, 0.06), 0 18px 40px -22px rgba(43, 23, 19, 0.28)',
      },
    },
  },
  plugins: [],
}
