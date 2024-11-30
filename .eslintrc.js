module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        parser: "flow",
      },
    ],
    "linebreak-style": ["error", "unix"], // Cambia "unix" por "windows" si trabajas en Windows
  },
  ignorePatterns: ["/dist/*"],
};
