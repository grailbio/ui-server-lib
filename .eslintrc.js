module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "@grailbio/eslint-config-grail/src/back-end",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["import", "filenames", "@typescript-eslint"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@grailbio/components",
            message: "Please do not import @grailbio/components from @grail/server-lib.",
          },
        ],
        patterns: ["@grailbio/server-lib/src/*"],
      },
    ],
  },
};
