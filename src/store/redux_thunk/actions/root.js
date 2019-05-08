/**
 * Created by xiaogang on 2018/5/18.
 *
 */
"use strict";

//actions

export const ROOTCITYINFO = 'ROOTCITYINFO';
export const ROOTLOCATIONINFO = 'ROOTLOCATIONINFO';
export const ROOTUSERINFO = 'ROOTUSERINFO';

/*
 * action 创建函数
 */


export const rootCityInfo = (params = {}) => {
  return {
    type: ROOTCITYINFO,
    params: params
  }

}


export const rootLocationInfo = (params = {}) => {
  return {
    type: ROOTLOCATIONINFO,
    params: params
  }

}


export const rootUserInfo = (params = {}) => {
  return {
    type: ROOTUSERINFO,
    params: params
  }
}
