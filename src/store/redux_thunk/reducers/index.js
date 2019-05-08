/**
 *
 *
 * 怎样实现 模块化 导出 => 请使用前缀标识
 */
"use strict";
import {
  rootCityInfo,
  rootLocationInfo,
  rootUserInfo
} from './root';
import {thunkAjax, thunkObject} from './thunk';


//exports all reducers
export default {
  rootCityInfo, rootLocationInfo, rootUserInfo,
  thunkAjax, thunkObject
}
