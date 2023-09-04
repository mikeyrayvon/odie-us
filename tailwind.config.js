/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      screens: {
        pd: { max: "639px" },
      },
    },
  },
  plugins: [],
  safelist: ["doc-content"],
};
