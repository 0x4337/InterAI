/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lalo: [
          "lalo",
          "sans-serif",
        ] /* 'yourfont' can be any name you want to use to reference this font in your tailwind classes */,
      },
      colors: {
        primary: "black",
        faint: "rgba(0 0 0 0.5)",
        "faint-2": "#3A3A3A",
        goGreen: "#adfc05",
        stopRed: "#fe4648",
      },
    },
  },
  plugins: [],
};
