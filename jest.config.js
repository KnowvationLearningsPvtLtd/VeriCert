/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: 'ts-jest',
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
    
  },
};


// /** @type {import('ts-jest').JestConfigWithTsJest} */
// const config = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   setupFiles: ['<rootDir>/jest.env.setup.ts'],
//   transform: {
//     '^.+\\.tsx?$': ['ts-jest', {}],
//   },
// };

// export default config;


