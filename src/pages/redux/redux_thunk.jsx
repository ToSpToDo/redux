/**
 * Created by xiaogang on 2019/5/8.
 *
 */

"use strict";
import React from 'react';
import PropTypes from 'prop-types';

require('./redux.less');

export default class ReduxThunk extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {}
  };

  static defaultProps = {
    data: {}
  };

  static propTypes = {};

  render() {
    const {rootUserInfo, setRootUserInfo, getThunkAjax, thunkAjax} = this.props;
    return (<div className="page-redux">
      <header> redux thunk</header>
      <button onClick={e => setRootUserInfo({userId: 'redux'})}>click</button>
      <div>{JSON.stringify(rootUserInfo)}</div>
      <button onClick={e => getThunkAjax({userId: 'redux'})}>click</button>
      <div>{JSON.stringify(thunkAjax)}</div>
    </div>)
  }
}
