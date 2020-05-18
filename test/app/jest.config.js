module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './setup.ts',
  compilerOptions: {
    "types": ["node", "jest"],
  }
};