const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".w-400": {
          width: "400px",
        },
        ".montserrat": {
          fontFamily: "'Montserrat', sans-serif",
        },
        ".grey-10": {
          color: "rgb(75, 75, 109)",
        },
        " .bg-grey-10": {
          backgroundColor: "#373750",
        },
        ".border-b-3": {
          borderBottomWidth: "3px",
        },
        ".table-column": {
          fontSize: "14px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifySelf: "center",
          alignSelf: "center",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
