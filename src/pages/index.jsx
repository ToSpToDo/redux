"use strict";
//base
import React from 'react';
import PropTypes from 'prop-types';

//style base
// require("../ui/index.less");
// require("../common/common.less");

//component
// import UI from './store/container/uiContainer';


export default class Index extends React.Component {
  //初始化 组件 属性和状态
  constructor(props) {
    super(props);

    this.state = {
      msg: "app react"
    };
  }


  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  }

  render() {
    console.log(this.props);
    return <div className="react-content">
      {this.props.children}
      {/*<UI/>*/}
    </div>
  }

}

