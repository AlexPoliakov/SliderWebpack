`use strict`;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    context: __dirname + '/src',
    entry: {
        app: './binder_comp.js',
    },
    output: {
        path: __dirname + '/dist',
        publicPath: "",
        filename: '[name]-bundle.js',
    },

    watch: true,

    devServer: {
        open: true,
        contentBase: __dirname + '/dist',
        hot: true,
        port: 10000,
        stats: 'errors-only'
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
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            hash: true,
            template: 'index.html'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].min.js',
        }),

        new ExtractTextPlugin({
            filename: '[name].min.css',
            allChunks: true,
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

module.exports = config;