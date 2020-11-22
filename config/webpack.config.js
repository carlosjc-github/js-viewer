const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        build: '../dist/index.js'
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '',
        path: path.resolve(__dirname, '../dist/')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devtool: 'inline-module-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    'sass-loader'
                ]
            }
        ]
    },
    stats: 'errors-warnings',
    storeStatsTo: 'webpackStats',
    failOnError: true,
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
            publicPath: ''
        })
    ]
};
