const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/demo/src'],
  modulePaths: ['<rootDir>/dist'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/demo/tsconfig.spec.json'
    }
  }
};
