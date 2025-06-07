export default {
  rootDir: "../",
  setupFilesAfterEnv: ['./tests/jest.setup.js'],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testTimeout: 100000,
  reporters: [
    "default",
    "jest-spec-reporter"
  ]
};