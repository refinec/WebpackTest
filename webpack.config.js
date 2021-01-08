const path = require('path');
// HtmlWebpackPlugin 还是会默认生成它自己的 index.html 文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理 /dist 文件夹
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode:'development',
    optimization:{
        usedExports:true
    },
    entry: {
        app:'./src/index.js',
    },

    output: {
        // filename: 'main.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'管理输出'
        }),
        new webpack.HotModuleReplacementPlugin() // 启用热模块替换 HMR
    ],
    module:{
        rules:[
            // 配置 loader、解析器等选项
            {
                test:/\.css$/,
                use:[ // 处理css，从后往前的顺序
                    'style-loader',
                    'css-loader'
                ]
            },
            {   
                // 处理图像
                // 压缩和优化图像使用 image-webpack-loader 和 url-loader
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                // 加载 fonts 字体
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            },
            
            // 加载数据
            {
                // 处理CSV、TSV数据文件
                test:/\.(csv|tsv)$/,
                use:[
                    'csv-loader'
                ]
            },
            {   
                // 处理XML数据文件
                test:/\.xml$/,
                use:[
                    'xml-loader'
                ]
            }
        ]
    },
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist', // // 告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下
        hot:true
    },

}