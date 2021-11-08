const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/ngx-security/src'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/ngx-security/tsconfig.spec.json'
    }
  }
};
