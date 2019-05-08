const path = require('path');
const _ENV = process.env.NODE_ENV || "dev";//默认 prod
module.exports = {
  env: _ENV || 'dev',
  projectRoot: path.resolve(__dirname, '../'),
  folder: _ENV === "prod" ? "react" : "react-" + _ENV,//打包存放的文件夹
  publicPath: '',//html文件和webpack打包生成的js文件的引用路径
};
