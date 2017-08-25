`use strict`;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    build: path.join(__dirname, 'build'),
};

const developmentConfig = {

    context: PATHS.app,

    entry: {
        app: './binder_comp.js',
    },

    output: {
        path: PATHS.dist,
        filename: '[name]-bundle.js',
    },

    watch: true,

    devtool: 'inline-source-map',

    devServer: {
        open: true,
        contentBase: PATHS.dist,
        hot: true,
        port: 10000,
        stats: 'errors-only'
    },

    module: {
        rules: [
            {
                test: /.css$/,
                use: [ 'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Develop & Hot Module Replacement',
            hash: true,
            template: 'index.html'
        }),

        new UglifyJSPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                compress: {},
                warnings: true
            },
            parallel: {
                cache: true,
                workers: 2
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].min.js'
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

const productionConfig = {
    context: PATHS.app,

    entry: {
        app: './binder_comp.js',
    },

    output: {
        path: PATHS.build,
        filename: '[name]-bundle.js',
    },

    watch: false,

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
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            hash: false,
            template: 'index.html'
        }),

        new UglifyJSPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                compress: {},
                warnings: true
            },
            parallel: {
                cache: true,
                workers: 2
            }
        }),

        new ExtractTextPlugin({
            filename: 'style/[name].min.css',
            allChunks: true,
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'script/vendor.min.js',
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
};

module.exports = (env) => {
    if (env === 'development') {
        return developmentConfig;

    }

    return productionConfig;
};