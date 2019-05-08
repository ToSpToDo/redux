/**
 * Created by xiaogang on 2019/5/8.
 *
 */

"use strict";
import React from 'react';
import PropTypes from 'prop-types';


export default class redux extends React.Component {
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
    const {rootUserInfo, setRootUserInfo} = this.props;
    return (<div className="classify-item">
      redux
      <button onClick={e => setRootUserInfo({userId: 'redux'})}>click</button>
      {
        JSON.stringify(rootUserInfo)
      }
    </div>)
  }
}
