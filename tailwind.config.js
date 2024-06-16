/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#3C177D",
          "primary-content": "#FFFFFF",
          secondary: "#E69379",
          "secondary-content": "#000000",
          accent: "#C6A324",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#A782E8",
          "primary-content": "#000000",
          secondary: "#863219",
          accent: "#DBB839",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
