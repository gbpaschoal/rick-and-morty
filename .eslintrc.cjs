module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
  ],
  ignorePatterns: ["node_modules", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2],
    "object-curly-spacing": ["error", "always"],
    // "space-before-function-paren": ["error", "never"],
    "arrow-spacing": ["error", { before: true, after: true }],
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
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "comma-dangle": ["error", "always-multiline"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
    "no-console": "warn",
    "prefer-const": "error",

    "react/no-unescaped-entities": ["off"],
  },
};
