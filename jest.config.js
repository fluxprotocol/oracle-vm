// import pkg from 'ts-jest/presets';
// const { jsWithTs } = pkg;

const { jsWithTs } = require('ts-jest/presets');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        ...jsWithTs.transform,
    },
    testPathIgnorePatterns: [
        'dist',
    ],
};
