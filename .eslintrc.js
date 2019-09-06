module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ["@grailbio/eslint-config-grail/src/back-end", "@grailbio/eslint-config-grail/src/flow"],
  plugins: ["flowtype", "import", "filenames"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message: 'Please import lodash functions directly, eg: import isEmpty from "lodash/isEmpty".',
          },
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
