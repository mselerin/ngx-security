const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/ngx-security/src'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/ngx-security/tsconfig.spec.json'
    }
  }
};
