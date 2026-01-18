/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
    '\\.svg$': '<rootDir>/lib/svgTransform.cjs',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!lucide-react)',
  ],

  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],

  coverageProvider: 'v8',
};
