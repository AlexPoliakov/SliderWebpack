`use strict`;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const env = process.env.NODE_ENV;

const config = {
    context: __dirname + '/src',
    entry: {
        app: './binder_comp.js',
    },
    output: {
        path: __dirname + '/dist',
        publicPath: "/assets/",
        filename: '[name].js',
    },

    devServer: {
        open: true,
        contentBase: __dirname + '/dist',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
};

module.exports = config;