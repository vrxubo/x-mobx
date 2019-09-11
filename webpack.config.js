const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/vmobx2/mobx.js',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    port: 3000,             // 端口
    open: true,             // 自动打开浏览器
    hot: true,               // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 1,
            publicPath: '/',
          }
        }],
      },
      {
        test: /.jsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /.tsx?$/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: { onlyCompileBundledFiles: true }
        }],
      },
      {
        test: /.(le|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [postcssPresetEnv()]
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {},
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      resolve('node_modules'),
      resolve('src'),
    ],
    /* 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名 */
    extensions: ['.js', '.tpl', '.jsx', '.json', '.ts', '.tsx'],
    alias: {

    }
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css'
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './index.html',
    //   inject: true
    // }),
    // new ObsoleteWebpackPlugin({
    //   template: '<div>不支持当前浏览器</div>',
    //   name: 'obsolete'
    // }),
    // new ScriptExtHtmlWebpackPlugin({
    //   async: 'obsolete'
    // })
  ]
}
