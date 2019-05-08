import {THUNKOBJECT, THUNKFUNCERR, THUNKFUNCING, THUNKFUNCSUCCESS} from '../actions/thunk'


export const thunkObject = (
  state = {
    msg: ''
  }, action = {}) => {
  let _params = action.params;
  switch (action.type) {
    case THUNKOBJECT:
      return {
        ...state,
        ..._params
      }
    default :
      return state
  }
}
export const thunkAjax = (
  state = {
    data: {},
    code: 0,
    msg: '',
    isFetching: false
  }, action = {}) => {
  let _params = action.params;
  switch (action.type) {
    case THUNKFUNCING:
      return {
        ...state,
        isFetching: true
      }
    case THUNKFUNCSUCCESS:
      return {
        ...state,
        ..._params,
        isFetching: false
      }
    case THUNKFUNCERR:
      return {
        ...state,
        ..._params,
        isFetching: false
      }
    default :
      return state
  }
}
