module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        'clean-blue': '#4E5ABD',
        'marble-white': '#EFF1F7',
        'dracula': '#444444',
        'dull-gray': '#C4C4C4',
        'city-lights': '#f1f2f6',
        'twitter-blue': '#1DA1F2',
        'sunrise': 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
