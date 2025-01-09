/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-blue": "#0C66F1",
        "theme-dark-blue": "#171840",
        "theme-faint-dark-blue": "#3147FF3A",
        "theme-black": "#0A102F",
      },
      backgroundImage: {
        "popup-bg": "url(/src/assets/popupBg.png)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
