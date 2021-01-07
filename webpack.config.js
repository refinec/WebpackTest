const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        // filename: 'main.js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
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
    }
}