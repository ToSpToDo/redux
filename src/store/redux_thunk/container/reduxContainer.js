//base
import React from 'react';
import {connect} from 'react-redux';
// v4 新增
import {withRouter} from 'react-router-dom'
//action
import {rootUserInfo, rootCityInfo} from '../actions/root';
import {thunkAjax} from '../actions/thunk';
//pages
import redux from '../../../pages/redux/redux_thunk';

function mapStateToProps(state, ownProps) {
  console.log("---------- mapStateToProps----------");
  console.log(state);// 全局state
  console.log(ownProps);
  return {
    rootUserInfo: state.rootUserInfo,
    rootCityInfo: state.rootCityInfo,
    thunkObject: state.thunkObject,
    thunkAjax: state.thunkAjax
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log("----------couterContainer of mapDispatchToProps----------");
  console.log(ownProps);
  return {
    setRootUserInfo: params => dispatch(rootUserInfo(params)),
    getThunkAjax: params => dispatch(thunkAjax(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(redux));


// before  发现这个也可以
// export default connect(mapStateToProps)(Something)

// after
// import { withRouter } from 'react-router-dom'
// export default withRouter(connect(mapStateToProps)(Something))

