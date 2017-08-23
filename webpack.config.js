`use strict`;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

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
        contentBase: __dirname + '',
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].min.js',
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),

        new ExtractTextPlugin({
            filename: 'build.min.css',
            allChunks: true,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

module.exports = config;