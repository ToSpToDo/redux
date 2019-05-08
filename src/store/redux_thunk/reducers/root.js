//action
import {
  ROOTCITYINFO, ROOTHEADERINFO, ROOTLOCALCITYINFO, ROOTLOCATIONINFO, ROOTMAP, ROOTPAY, ROOTUSERINFO
} from '../actions/root';


/**
 * 用户实时的经纬度信息
 */
export const rootLocationInfo = (
  state = {
    latitude: '',
    longitude: '',
    default: true
  }, action = {}) => {
  let _params = action.params;


  switch (action.type) {
    case "ROOTLOCATIONINFO":
      return {
        ...state,
        default: false,
        timestamp: (new Date()).getTime(),
        ..._params // 如果在模拟数据，_params.default:true
      }
    default :
      return state
  }
}

/**
 *  用户手动选择的城市信息
 * @param state
 * @param action
 * @returns {*}
 */
export const rootCityInfo = (
  state = {
    cityCode: '',
    cityName: '',
    default: true
  }, action = {}) => {
  let _params = action.params;

  switch (action.type) {
    case "ROOTCITYINFO":
      return {
        ...state,
        default: false,
        ..._params // 如果在模拟数据，_params.default:true
      }
    default :
      return state
  }
}


/**
 * 用户的注册 登录信息
 * @param state
 * @param action
 * @returns {*}
 */
export const rootUserInfo = (
  state = {
    userId: ''
  }, action = {}) => {
  let _params = action.params;

  switch (action.type) {
    case "ROOTUSERINFO":
      return Object.assign({}, state, _params);
    default :
      return state
  }
}





