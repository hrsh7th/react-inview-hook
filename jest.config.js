module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["<rootDir>/src/**/*.test.+(ts|tsx|js)"]
};
