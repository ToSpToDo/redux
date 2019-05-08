/**
 * Created by xiaogang on 2016/12/21.
 */
"use strict";
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveWebpackPlugin = require('remove-webpack-plugin');

const CONFIG = require('./config');
const projectRoot = CONFIG.projectRoot || path.resolve(__dirname, '../');
const _buildFolder = CONFIG.folder;
const isProd = CONFIG.env === 'prod';

module.exports = {
  // 报错直接终止
  bail: true,
  // todo:
  context: __dirname,
  entry: {
    app: path.join(projectRoot, './src/app.js'),
  },
  output: {
    path: path.join(projectRoot, './build/' + _buildFolder),
    publicPath: '',
    filename: '[name].[hash].js',
    chunkFilename: 'chunks/[name].[hash].js'
  },
  resolve: {
    mainFiles: ["index", "app"],
    extensions: [".js", ".json", '.jsx', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: !isProd
            }
          }]
      }
    ]
  },
  plugins: [
    new RemoveWebpackPlugin([path.join(projectRoot, './build/' + _buildFolder)]),
    //可以和entry文件联合配置
    new HtmlWebpackPlugin({
      //inject: false,
      title: 'redux demo',
      //filename: 'index.html',
      template: '../src/entry/template.ejs',
    })
  ],
  optimization: {
    splitChunks: {
      minSize: 100000,
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: {
      name: 'runtime',
    }
  }
};

