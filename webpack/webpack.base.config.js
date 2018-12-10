const path = require('path');

const configUtil = require('./config.util');

const isDev = true;

const HtmlWebPackPlugin = require('html-webpack-plugin');

// copy公共资源文件到dist文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 清理dist文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');

// html 入口文件配置
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, '../src/index.html'),
    filename: 'index.html',
    styleUrl: configUtil.getCommonCssPath(isDev),
    commonJsUrl: configUtil.getCommonJSPath(isDev)
});

// 清理文件夹配置
const cleanWebpackPlugin = new CleanWebpackPlugin(['dist'],{
    root: path.resolve(__dirname,'..'),       　　　　　　　　　　//根目录
    verbose: true,        　　　　　　　　　　//开启在控制台输出信息
    dry: false        　　　　　　　　　　//启用删除文件
});

// 静态资源配置
const copyWebpackPlugin = new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../assets'),
        to: 'assets',
        ignore: ['.*']
    }
]);
module.exports = {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.join(__dirname,'../dist/'),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "../dist",
        quiet: false,   //控制台中不输出打包的信息
        noInfo: false,
        host: "0.0.0.0",
        hot: true,      //开启热点
        inline: true,   //开启页面自动刷新
        lazy: false,    //不启动懒加载
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8080', //设置端口号
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
            '/test': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            },
            '/club': {
                target: 'http://99.6.118.95:11004/api',
                secure: false,
                changeOrigin: true
            }
        }

    },
    plugins: [
        htmlPlugin,
        copyWebpackPlugin,
        cleanWebpackPlugin,
    ],
    module: {
        rules: [
            { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
            { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
        ]
    }
}
