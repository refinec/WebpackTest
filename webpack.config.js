const path = require('path');
// HtmlWebpackPlugin 还是会默认生成它自己的 index.html 文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理 /dist 文件夹
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode:'development',
    optimization:{
        usedExports:true
    },
    entry: {
        app:'./src/index.js',
        // app:'./src/dynamicImport.js', // 动态导入
        // app:'./src/lazyLoading.js', // 懒加载
    },

    output: {
        // filename: 'main.js',
        // filename: '[name].bundle.js',
        filename:'[name].[contenthash].js',
        chunkFilename:'[name].bundle.js', // 动态导入的输出
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'管理输出'
        }),
        new webpack.HotModuleReplacementPlugin(), // 启用热模块替换 HMR
        // new webpack.HashedModuleIdsPlugin() // 生产环境插件。启用contenthash修复，vendor第三方chunk hash不变(webpack4没有这个问题)
        
        // 该插件告诉webpack遇到了至少一处用到 _ 变量的模块实例，
        // 那将 lodash package 引入进来，并将其提供给需要用到它的模块。舍去了 import _ from 'lodash'
        new webpack.ProvidePlugin({
            // _: 'lodash'

            //  还可以使用 ProvidePlugin 暴露出某个模块中单个导出，通过配置一个“数组路径”（例如 [module, child, ...children?]）实现此功能。
            // 这样就能很好的与 tree shaking 配合，将 lodash library 中的其余没有用到的导出去除
            join:['lodash', 'join'], 
        }),
        // 渐进式网络应用程序
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim:true,
            skipWaiting:true
        })

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
            },
            { // 解析ts文件
                test:/\.tsx?$/,
                use:'ts-loader',
                exclude:/node_modules/
            }
        ]
    },
    resolve:{
        extensions:['.tsx', '.ts', '.js']
    },
    devtool:'inline-source-map', // 告诉 webpack 提取这些 source map，并内联到最终的 bundle 中
    devServer:{
        contentBase:'./dist', // // 告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下
        hot:true
    },
    // optimization:{ // 代码分割
    //     splitChunks:{
    //         chunks: 'all'
    //     }
    // },
    optimization:{
        runtimeChunk: 'single', // 将 runtime 代码拆分为一个单独的 chunk
        splitChunks:{ // 将第三方库library提取到单独的vendor chunk文件中
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name:'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}