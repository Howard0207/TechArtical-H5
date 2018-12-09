const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ConfigUtils = require('./config.util');

// css配置
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    allChunks: true,
    disable: process.env.NODE_ENV === "development"
});

module.exports = {

    entry: {
        config: path.join(__dirname,'../scss/config/index.scss'),
        components: path.join(__dirname,'../scss/components/index.scss'),
        pages: path.join(__dirname,'../scss/pages/index.scss')
    },
    output: {
        filename: '[name].css',
        path: path.join(__dirname,'../dist/assets/css')
    },
    mode: 'development',
    plugins: [ extractSass ],
    module: {
        rules: [
            { test: /\.scss$/, use: extractSass.extract({ use: [{ loader: 'css-loader', options: {url: false } }, { loader: 'px-to-rem-loader', options: ConfigUtils.getCssRemOption() }, { loader: 'sass-loader' }], fallback: 'style-loader' }) },
        ]
    }
}