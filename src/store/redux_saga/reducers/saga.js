import {SAGAFUNCERR, SAGAFUNCING, SAGAFUNCSUCCESS, SAGAOBJECT} from '../actions/saga'


export const sagaObject = (
  state = {
    msg: ''
  }, action = {}) => {
  let _params = action.params;
  switch (action.type) {
    case SAGAOBJECT:
      return {
        ...state,
        ..._params
      }
    default :
      return state
  }
}
export const sagaAjax = (
  state = {
    data: {},
    code: 0,
    msg: '',
    isFetching: false
  }, action = {}) => {
  let _params = action.params;
  switch (action.type) {
    case SAGAFUNCING:
      return {
        ...state,
        isFetching: true
      }
    case SAGAFUNCSUCCESS:
      return {
        ...state,
        ..._params,
        isFetching: false
      }
    case SAGAFUNCERR:
      return {
        ...state,
        ..._params,
        isFetching: false
      }
    default :
      return state
  }
}
