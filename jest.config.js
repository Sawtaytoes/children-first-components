const jestConfig = {
  clearMocks: true,
  rootDir: './src',
  setupFilesAfterEnv: [
    '<rootDir>/jest-setup.js',
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/cypress/',
    '/node_modules/',
  ],
  verbose: true,
}

module.exports = jestConfig
