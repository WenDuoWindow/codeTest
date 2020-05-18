const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const config = merge(common, {
  devtool: 'inline-source-map', //打包之后，如果模块有依赖关系，当依赖的模块报错，可以知道是哪个依赖模块，而不是打包之后的模块统一报错
  devServer: {
    contentBase: './src',
    port: 3000,
    hot: true
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": (JSON.stringify(process.env.NODE_ENV + '_aaaaa'))
    })
  ]
})
module.exports = config