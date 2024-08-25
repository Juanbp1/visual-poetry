// import dd from './src/tests/__mocks__/svg'
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|jsx)$':
      '<rootDir>./src/tests/__mocks__/file-mock.js',
    // 'react-compare-slider':
    //   '<rootDir>./src/setupTests/react-compare-slider',
    // 'mockUseMediaQuery':'<rootDir>.src/tests/__mocks__/mockUseMediaQuery.js'
  },
  coveragePathIgnorePatterns: [
    '/userHelpers.js',
    '/mockUseMediaQuery.js',
    'index.js',
    'firebase-debug.log',
    '<rootDir>/build',
  ],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  setupFilesAfterEnv: ['<rootDir>./src/setupTests.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
