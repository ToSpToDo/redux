const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.js');
// const workbox = require('./workbox.js');

const devConfig = merge.smart(baseConfig, {
  mode: 'development',
  devtool: '#eval-source-map',
});


module.exports = devConfig;
