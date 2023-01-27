/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        promoted: "0 0px 20px 5px rgba(0, 0, 0, 0.3)",
        restaurant: "0 0px 10px 2px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
