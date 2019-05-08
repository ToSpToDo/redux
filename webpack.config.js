const CONFIG = require('./webpack/config');
const _ENV = CONFIG.env;

//默认获取dev环境
let webpackConfig = require('./webpack/webpack.dev');
if (_ENV == 'prod') {
  webpackConfig = require('./webpack/webpack.prod');
}

module.exports = webpackConfig;
