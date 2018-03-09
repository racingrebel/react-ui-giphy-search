const env = 'development';

const webpack = require('webpack');
const path = require('path');

const config = {
    mode: env,

    entry: path.join(__dirname, 'demo/app.js'),
    output: {
        path: path.join(__dirname, 'demo'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};

module.exports = config;