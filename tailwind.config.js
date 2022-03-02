module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      colors: {
        gray: {
          100: '#E0E6E9',
          500: '#ABBBC2',
          700: '#393C49',
          900: '#1F1D2B',
          800: '#252836',
        },
        primary: '#4f46e5',
        accent: {
          blue: '#65B0F6',
          orange: '#FFB572',
          red: '#FF7CA3',
          green: '#50D1AA',
          purple: '#9290FE',
        },
      },
      boxShadow: {
        primary: '0px 4px 12px rgba(234, 124, 105, 0.32)',
        'inverse-top': '2px 2px 0 #252836',
        'inverse-bottom': '2px -2px 0 #252836',
      },
      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
};
