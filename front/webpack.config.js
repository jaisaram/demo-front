const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack'); // to access built-in plugins
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /.html$/i,
                use: ["html-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg|wedp)$/i,
                include : path.join(__dirname, 'dist'),
                use: [ 'url-loader']
            },
           
            {
                test: /\.css$/,
                use: [
                    // [style-loader](/loaders/style-loader)
                    { loader: 'style-loader' },
                    // [css-loader](/loaders/css-loader)
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // [sass-loader](/loaders/sass-loader)
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.css','.scss',  ".js", ".jsx", ".ts", ".tsx"],
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    plugins: [
        new Dotenv(),
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: path.join(__dirname, "dist") +'/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/assets/",
                    to: "assets",
                },
            ],
        }),
    ],
    mode: "development",
    devtool: "source-map",
    devServer: {
        https: true,
        port: 8080,
        static: path.resolve(__dirname, 'dist'),
        hot: true,
        historyApiFallback: true
    },
};

