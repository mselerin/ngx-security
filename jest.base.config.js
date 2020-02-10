module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [`${__dirname}/jest.setup.ts`],
  transformIgnorePatterns: [
    'node_modules'
  ]
};
