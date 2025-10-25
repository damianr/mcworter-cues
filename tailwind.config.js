/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      // Custom color palette
      bg: "#101010",
      "bg-100": "#161616",
      "bg-200": "#222222",
      ink: "#FCFCFC",
      "ink-100": "#AFAFAF",
      "ink-200": "#777777",

      // Keep transparent and current for utilities
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      heading: ["Libre Baskerville", "serif"],
      body: ["Lexend", "sans-serif"],
      mono: ["Fragment Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        body: {
          fontFamily: "'Lexend', sans-serif",
          fontSize: "0.875rem", // 14px on mobile
          "@media (min-width: 768px)": {
            fontSize: "1rem", // 16px on desktop
          },
        },
        "h1, h2, h3, h4, h5, h6": {
          fontFamily: "'Libre Baskerville', serif",
          fontWeight: "bold",
        },
        h1: {
          fontSize: "2rem", // 32px on mobile
          lineHeight: "2.25rem",
          fontWeight: "bold",
          "@media (min-width: 768px)": {
            fontSize: "2.5rem", // 40px on desktop
            lineHeight: "2.75rem",
          },
        },
        h2: {
          fontSize: "1.875rem", // text-3xl equivalent
          lineHeight: "2.25rem",
          fontWeight: "bold",
        },
        h3: {
          fontSize: "1.5rem", // text-2xl equivalent
          lineHeight: "2rem",
          fontWeight: "bold",
        },
        h4: {
          fontSize: "1.25rem", // text-xl equivalent
          lineHeight: "1.75rem",
          fontWeight: "bold",
        },
        h5: {
          fontSize: "1.125rem", // text-lg equivalent
          lineHeight: "1.75rem",
          fontWeight: "bold",
        },
        h6: {
          fontSize: "1rem", // text-base equivalent
          lineHeight: "1.5rem",
          fontWeight: "bold",
        },
      });
    },
  ],
};
