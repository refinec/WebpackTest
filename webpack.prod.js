const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode:'production', // 会引入tree shaking 中的TerserPlugin
    devtool: 'source-map', // 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能
})
