/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {      height: {
      '1/2-screen': '50vh',
      '1/3-screen': '30vh',
      '1/4-screen': '25vh',
      '1/6-screen': '16.67vh', // 화면의 1/6 높이를 설정
      '1/8-screen': '12.5vh',  // 화면의 1/8 높이를 설정
    },
  },
  plugins: [require("daisyui")],
}};
