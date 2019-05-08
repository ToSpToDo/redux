import ajax from '../../../service/service'
// actions
export const SAGAOBJECT = 'SAGAOBJECT';
export const SAGAFUNCING = 'SAGAFUNCING';
export const SAGAFUNCSUCCESS = 'SAGAFUNCSUCCESS';
export const SAGAFUNCERR = 'SAGAFUNCERR';
/*
 * action 创建函数
 */


export const sagaObject = (params = {}) => {
  return {
    type: SAGAOBJECT,
    params: params
  }
}

/**
 *  1、不在返回一个action对象。所以需要借助 saga 插件帮忙处理。redux本身不支持返回函数
 *  2、一般需要配合对应的额异步action状态。
 *  3、本身的调用通过container传递给业务层使用。& 同时把对应的reducers状态传递给业务层
 * @param params
 * @returns {function(*, *): Promise<any | never>}
 */
export const sagaAjax = (params = {}) => (dispatch, getState) => {
  dispatch(sagaFuncIng());
  return ajax({
    data: {
      'action_type': '采用saga处理函数action',
      ...params
    }
  })
    .then(
      res => dispatch(sagaFuncSuccess(res)),
      err => dispatch(sagaFuncErr(err)))
}
export const sagaFuncIng = (params = {}) => {
  return {
    type: SAGAFUNCING,
    params: params
  }
}
export const sagaFuncSuccess = (params = {}) => {
  return {
    type: SAGAFUNCSUCCESS,
    params: params
  }
}
export const sagaFuncErr = (params = {}) => {
  return {
    type: SAGAFUNCERR,
    params: params
  }
}
