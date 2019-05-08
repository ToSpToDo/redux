import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'

const store = createStore(
  reducer,
  applyMiddleware(createSagaMiddleware(helloSaga))
)
