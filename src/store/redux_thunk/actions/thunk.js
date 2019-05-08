import ajax from '../../../service/service'
// actions
export const THUNKOBJECT = 'THUNKOBJECT';
export const THUNKAJAX = 'THUNKAJAX';
export const THUNKFUNCING = 'THUNKFUNCING';
export const THUNKFUNCSUCCESS = 'THUNKFUNCSUCCESS';
export const THUNKFUNCERR = 'THUNKFUNCERR';
/*
 * action 创建函数
 */


export const thunkObject = (params = {}) => {
  return {
    type: THUNKOBJECT,
    params: params
  }
}

/**
 *  1、不在返回一个action对象。所以需要借助 thunk 插件帮忙处理。redux本身不支持返回函数
 *  2、一般需要配合对应的额异步action状态。
 *  3、本身的调用通过container传递给业务层使用。& 同时把对应的reducers状态传递给业务层
 * @param params
 * @returns {function(*, *): Promise<any | never>}
 */
export const thunkAjax = (params = {}) => (dispatch, getState) => {
  dispatch(thunkFuncIng());
  return ajax({
    data: {
      'action_type': '采用thunk处理函数action',
      ...params
    }
  })
    .then(
      res => dispatch(thunkFuncSuccess(res)),
      err => dispatch(thunkFuncErr(err)))
}
export const thunkFuncIng = (params = {}) => {
  return {
    type: THUNKFUNCING,
    params: params
  }
}
export const thunkFuncSuccess = (params = {}) => {
  return {
    type: THUNKFUNCSUCCESS,
    params: params
  }
}
export const thunkFuncErr = (params = {}) => {
  return {
    type: THUNKFUNCERR,
    params: params
  }
}
