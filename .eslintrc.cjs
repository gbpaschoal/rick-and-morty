module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: ["eslint:recommended"],
  ignorePatterns: ["node_modules"],
  parser: "@typescript-eslint/parser",
  rules: {
    "object-curly-spacing": ["error", "always"],
    "no-unset-vars": false,
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "arrow-spacing": ["error", { before: true, after: true }],
    "comma-dangle": ["error", "always-multiline"],
    "max-len": [
      "warn",
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
