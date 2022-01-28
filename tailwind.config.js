module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#008289',
        'secondary': '#60CED4',
        'btn': '#5271FF',
        'borderColor': '#707070',
        'cyan': '#06C3B4',
        'danger': '#C34F06',
        'ash': '#B2B2B2',
        'yellowBg': '#FFF5A7',
        'light-black': '#00000050',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
