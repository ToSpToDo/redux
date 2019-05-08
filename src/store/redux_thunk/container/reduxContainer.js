//base
import React from 'react';
import {connect} from 'react-redux';
// v4 新增
import {withRouter} from 'react-router-dom'
//action
import {rootUserInfo,rootCityInfo} from '../actions/root';
//pages
import redux from '../../../pages/redux/redux';

function mapStateToProps(state, ownProps) {
  console.log("----------uiContainer of mapStateToProps----------");
  console.log(state);// 全局state  参见 reducer/index.jsx
  console.log(ownProps);
  return {
    rootUserInfo: state.rootUserInfo,
    rootCityInfo: state.rootCityInfo
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log("----------couterContainer of mapDispatchToProps----------");
  console.log(ownProps);
  return {
    setRootCityInfo: (params) => dispatch(rootCityInfo(params)),
    setRootUserInfo: (params) => dispatch(rootUserInfo(params)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(redux));


// before  发现这个也可以
// export default connect(mapStateToProps)(Something)

// after
// import { withRouter } from 'react-router-dom'
// export default withRouter(connect(mapStateToProps)(Something))

