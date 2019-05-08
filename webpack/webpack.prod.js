const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MinifyPlugin = require("babel-minify-webpack-plugin");
// const workbox = require('./workbox.js');

const prodConfig = merge.smart(baseConfig, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: "string-replace-loader",
            options: {
              search: "@replaceStart[\\w\\W\\s]*?@replaceEnd",//[\w\W\s] 无效会转化为 [wWs]
              replace: "苦逼的开发环境...",
              flags: 'g'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MinifyPlugin({
      removeConsole: true
    })
  ]

});

module.exports = prodConfig;
