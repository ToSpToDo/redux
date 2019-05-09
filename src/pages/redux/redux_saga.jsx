/**
 * Created by xiaogang on 2019/5/8.
 *
 */

"use strict";
import React from 'react';
import PropTypes from 'prop-types';

require('./redux.less');

export default class ReduxSaga extends React.Component {
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
    const {sagaAjax, sagaObject, setSagaObject, setSagaAjax} = this.props;
    return (<div className="page-redux">
      <header>redux saga</header>
      <button onClick={e => setSagaObject({redux: 'saga'})}>click</button>
      <div>{JSON.stringify(sagaObject)}</div>
      <button onClick={e => setSagaAjax({redux: 'saga'})}>click</button>
      <div>{JSON.stringify(sagaAjax)}</div>
    </div>)
  }
}
