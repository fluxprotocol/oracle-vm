// import { fileURLToPath } from 'url';
// import { resolve, dirname } from 'path';

const { resolve } = require('path');

// const __dirname = dirname(fileURLToPath(import.meta.url));

module.exports = {
    entry: './src/Process.ts',

    target: 'node',

    mode: process.env.NODE_ENV,

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs'],
    },

    output: {
        library: {
            type: 'umd2',
        },
        globalObject: 'this',
        filename: 'Process.js',
        // publicPath: '',
        path: resolve(__dirname, 'dist'),
    },
};