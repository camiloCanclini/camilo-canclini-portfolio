import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      colors: {
        theme: {
          bg: "#e8e8e8",
          bg2: "#EBEBEB",
          primary: "#000",
          secondary: "#333",
          complementary: "#FFF",
        },
        themedark: {
          bg: "#02040d",
          bg2: "#283C52",
          primary: "#FFF",
          secondary: "#DDD",
          complementary: "#000",
        },
      },
    },
  },
  //plugins: [addVariablesForColors],
  corePlugins: {
    scrollBehavior: true,
  },
}
