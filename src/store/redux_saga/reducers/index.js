/**
 *
 *
 * 怎样实现 模块化 导出 => 请使用前缀标识
 */
"use strict";
import {sagaObject, sagaAjax} from './saga';


//exports all reducers
export default {
  sagaObject, sagaAjax
}
