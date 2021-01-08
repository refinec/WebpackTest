const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode:'production', // 会引入tree shaking 中的TerserPlugin
})
