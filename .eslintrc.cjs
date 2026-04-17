module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
  ],
  ignorePatterns: ["node_modules", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "arrow-spacing": ["error", { before: true, after: true }],
    "comma-dangle": ["error", "always-multiline"],
    "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
  },
};
