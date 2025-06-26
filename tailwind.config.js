/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // for files in /app
    "./pages/**/*.{js,ts,jsx,tsx}", // if you're using /pages folder (optional)
    "./components/**/*.{js,ts,jsx,tsx}", // reusable components (optional)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
