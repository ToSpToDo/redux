//base
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
//action
import {sagaAjax, sagaObject} from '../actions/saga';
//pages
import redux from '../../../pages/redux/redux_saga';

function mapStateToProps(state, ownProps) {
  console.log("----------  mapStateToProps----------");
  console.log(state);// 全局state
  console.log(ownProps);
  return {
    sagaObject: state.sagaObject,
    sagaAjax: state.sagaAjax
  }
}

//not function
const mapDispatchToProps = {
  setSagaObject: sagaObject,
  setSagaAjax: sagaAjax
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(redux));
