const merge = require('webpack-merge')
const common = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = merge(common, {
  devtool: 'inline-source-map', //打包之后，如果模块有依赖关系，当依赖的模块报错，可以知道是哪个依赖模块，而不是打包之后的模块统一报错
  mode: 'production',
  devtool: "source-map",
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].bundle.js' : '[name].js'
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
})
module.exports = config
