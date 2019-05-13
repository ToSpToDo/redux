import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducers from './reducers/index';//all reduces
import rootSaga from './sagas/index';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
export default store
