module.exports = {
  collectCoverageFrom: ["src/**/*.ts", "!**/index.ts", "!**/mocks/**", "!src/**/passport/**", "!src/**/middleware.ts"],
  coverageThreshold: {
    "src/**/*.ts": {
      branches: 80,
      functions: 100,
      lines: 90,
      statements: -10,
    },
  },
  testPathIgnorePatterns: ["<rootDir>/dist/", "/node_modules/"],
  moduleNameMapper: {
    "^@grail/(.*)$": "<rootDir>/../$1/src",
  },
};
