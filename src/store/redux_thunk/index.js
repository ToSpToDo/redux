
//base
import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducers from './reducers/index';//all reduces
import thunk from 'redux-thunk'; //dispatch(function)


//创建一个 Redux_thunk store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
let store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
);

/**
 * log states
 * @type {Unsubscribe}
 */
let unsubscribe = store.subscribe(() => { //监听状态的变化
    console.log("unsubscribe");
    console.log(store.getState());
  }
);

export default store;
