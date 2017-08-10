/**
 * Created by LukMcCall on 08.08.2017.
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const cssDev =['style-loader', 'css-loader','postcss-loader','sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ['css-loader','postcss-loader','sass-loader']
});
const cssConfig = isProd ? cssProd : cssDev;


module.exports = {
  entry: {
      app: './src/app.js'
  },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                enforce: "pre", // preload the jshint loader
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: {
                    loader: "jshint-loader"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["es2015"]
                    }
                }
            },
            {
                test: /.sass$/,
                use: cssConfig
            }
        ]
    },
    devServer:{
        contentBase: path.join(__dirname,"dist"),
        hot: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/[name].css',
            allChunks: true,
            disable: !isProd
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]

};