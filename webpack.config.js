const env = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackUMDExternal = require('webpack-umd-external');

const pluginsList = [];
const outputFileName = env === 'production' ?
    'react-ui-giphy-search.min.js' :
    'react-ui-giphy-search.js';

if (env === 'production') {
    pluginsList.push(
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: { warnings: false },
                output: { comments: false }
            }
        })
    );
}

const config = {
    mode: env,

    entry: path.join(__dirname, 'src/giphy-search.jsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: outputFileName,
        library: 'ReactGiphySearch',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    externals: webpackUMDExternal({
        'react': 'React'
    }),

    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: pluginsList,

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};

module.exports = config;