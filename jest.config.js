module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    "^.+\\.scss$": "identity-obj-proxy"
  },
  moduleFileExtensions: ['jsx', 'js'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ]
};