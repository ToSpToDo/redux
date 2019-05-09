import ajax from '../../../service/service'
// actions
export const SAGAOBJECT = 'SAGAOBJECT';
export const SAGAAJAX = 'SAGAAJAX';
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

export const sagaAjax = (params = {}) => {
  console.log(params)
  return {
    type: SAGAAJAX,
    params: params
  }
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
