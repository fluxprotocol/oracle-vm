const path = require('path');

const exclude = ['/node_modules', path.resolve(__dirname, './test/')];

module.exports = {
    mode: 'development',
    devtool: false,
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js'],
        aliasFields: ['browser'],
    },
    entry: {
        main: ['./src/main.ts'],
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        libraryTarget: 'umd',
        filename: '[name].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude,
                loader: 'babel-loader',
                options: {
                    sourceType: "unambiguous",
                },
            },
        ],
    },
    // node: {
    //     module: 'empty',
    //     dgram: 'empty',
    //     dns: 'mock',
    //     fs: 'empty',
    //     http2: 'empty',
    //     net: 'empty',
    //     tls: 'empty',
    //     child_process: 'empty',
    // },
};
