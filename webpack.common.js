const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = {
  entry: {
    index: path.join(__dirname, './src/js/index.js'),
    test: path.join(__dirname, './src/js/test.js')
  },
  devtool: 'inline-source-map', //打包之后，如果模块有依赖关系，当依赖的模块报错，可以知道是哪个依赖模块，而不是打包之后的模块统一报错
  devServer: {
    contentBase: './src',
    port: 3000,
    hot: true
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      // minSize: 30000,
      // minRemainingSize: 0,
      // maxSize: 0,
      minChunks: 1, //被按需引入几次都提取出来
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "all",
          minSize: 1024,
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // 将 JS 字符串生成为 style 节点
        },
        {
          loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        },
        {
          loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-arrow-functions']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), //每次打包，清除打包文件夹里面的文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      chunks: ['index', 'commons'],
      minify: {//对html文件进行压缩
        removeAttributeQuotes: true, //去掉属性的双引号
        removeComments: true,//去掉注释
        collapseWhitespace: true,//去掉空白
      },
      inject: true,
      hash: true, //避免缓存js。
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/test.html'),
      filename: 'test.html',
      chunks: ['test', 'commons'],
      minify: {//对html文件进行压缩
        removeAttributeQuotes: true, //去掉属性的双引号
        removeComments: true,//去掉注释
        collapseWhitespace: true,//去掉空白
      },
      inject: true,
      hash: true, //避免缓存js。
    })
  ]
};

module.exports = config;