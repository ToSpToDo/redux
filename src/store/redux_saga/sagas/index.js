import {call, put, takeEvery, take, takeLatest, fork} from 'redux-saga/effects'
import {SAGAAJAX, sagaFuncIng, sagaFuncSuccess, sagaFuncErr} from '../actions/saga';
import ajax from '../../../service/service'
import axios from 'axios';


function* sagaAjax(action) {
  console.log(action);
  yield put(sagaFuncIng());
  try {
    //  todo:
    //  1、非对象下的函数，通过call调用会报错，走catch
    //  2、 封装的 Promise 内部不执行
    const data = call(ajax.ajax, {
      url: 'sagaAjax.url : 所有接口服务配置化，同业务逻辑层分离维护！业务层只需负责该接口所需的业务数据data',
      data: {
        'action_type': '采用saga处理函数action',
        ...action.params
      }
    });
    // const data = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
    console.log(data)
    yield put(sagaFuncSuccess(data));
  } catch (err) {
    console.log(err)
    yield put(sagaFuncErr(err));
  }
}

function* watchActions() {
  yield takeEvery(SAGAAJAX, sagaAjax);
  // yield* takeLatest(SAGAAJAX, sagaAjax);

  // while (true) {
  //   const action = yield take(SAGAAJAX);
  //   yield fork(sagaAjax, action)
  // }
}


export default function* rootSaga() {
  console.log('root Sagas!');
  // combine all of our sagas that we create
  // and we want to provide all our Watchers sagas
  yield watchActions();
}

