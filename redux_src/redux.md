## redux
- 采用函数式编程的状态集中管理
- src：源码结构简洁清晰

### 使用
```js
import {createStore, combineReducers, applyMiddleware} from 'redux';
//all reduces ：index文件集中导出各个reducer文件
import reducers from './reducers/index';
import thunk from 'redux-thunk'; 

let store = createStore(
    combineReducers(reducers),
    //一般都直接在reducers的各个子模块的函数中自行初始化。
    // preloadedState,
    // enhancer函数：enhancer(createStore)(reducer, preloadedState)
    applyMiddleware(...[middleware])
  );
```

### createStore(reducer, preloadedState, enhancer)
- 入参
  - combineReducers(reducers) ：每个根reducer就是一个纯函数。实际开发中一般分模块维护各reducer，然后统一导出reducers。
  - preloadedState ：实际项目开发中基本不用，都是各根reducer自行初始化。统一反而不方便维护！
  - enhancer ：有插件存在时（递归处理），return enhancer(createStore)(reducer, preloadedState) 
    - 入参：createStore 函数
    - 返参：新的（处理过 or 加强的） createStore 函数
    - 备注：多个插件时也只会递归执行一次enhance函数。具体看applyMiddleware函数实现！

### compose(...funcArr)
> Composes functions from right to left.
>
> This is a functional programming utility, and is included in Redux as a convenience.

- Arguments
> (arguments): The functions to compose. Each function is expected to accept a single parameter. Its return value will be provided as an argument to the function standing to the left, and so on. The exception is the right-most argument which can accept multiple parameters, as it will provide the signature for the resulting composed function.
- Returns
> (Function): The final function obtained by composing the given functions from right to left.
- 源码 
```js
// compose(f, g, h)(...args) => (...args) => f(g(h(...args)))
compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((newFunc, func) => (...args) => newFunc(func(...args)))
}

```


### applymiddleware(...middlewareArr:[])
> Middleware is the suggested way to extend Redux with custom functionality. Middleware lets you wrap the store's dispatch method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.
> 
> The most common use case for middleware is to support asynchronous actions without much boilerplate code or a dependency on a library like Rx. It does so by letting you dispatch async actions in addition to normal actions.
- 入参：
  - 插件函数数组：具体函数要求参考后续文档。function middleware({ getState, dispatch }) => next => action=> typeof action === 'function' ? action(dispatch, getState) : next(action)
- 返参：
  - enhancer 函数。多个插件通过compose处理返回一个dispatch加强后的函数。所以createStore函数只会递归执行一次enhance函数，而不管有多少插件实现！
- 源码
```js
// 接收所有插件函数入参 middlewares:func[]
export default function applyMiddleware(...middlewares) {
  // 返回一个统一的enhancer 函数。createStore入参是 redux 自实现 createStore 的函数
  return createStore => (...args) => {
    // args:项目中调用 createStore(combineReducers(reducers),preloadedState)对应传入的参数。
    // 当然不包括enhancer。因为对应 middlewares 的封装处理是统一到内部实现了，没有放到return createStore=>(...args){} 外层 针对一个middleware返回一个enhance函数递归调用！
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 新的插件函数队列 func[f,g,k] => [f(middlewareAPI),g(middlewareAPI),k(middlewareAPI)]
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 覆盖store.dispatch函数。compose(f, g, h)(store.dispatch) => (store.dispatch) => f(g(h(store.dispatch)))
    dispatch = compose(...chain)(store.dispatch)

    return {
      // store : 就是没有enhance函数的正常返回值逻辑。
      ...store,
      // 插件applyMiddleware函数的核心就是覆盖store.dispatch函数。
      dispatch
    }
  }
}
```
- 具体的某个middleware要求：
  ```js
  
  /**
  * 必须是一个函数 & 同时接收两个入参 {dispatch,getState} & 必须再返回一个（回调）函数；方便后续插件使用
  * getState :func 方便获取其他状态 
  * dispatch :func 方便插件层决定dispatch的时机
  */
  function middleware({dispatch,getState}) {  
     /**
      *  res_middleware(next)
      * 必须返回一个（回调）函数
      * 接收 next 函数 : 源码中可以看到是 store.dispatch 函数
      */
     return next => 
             /**
              * res_middleware_next(action)
              * 返回函数的返回参数 还是必须再返回一个（回调）函数
              * 接收 action 参数 : 可以是对象 or 函数 or Promise 等（当然非对象格式需要插件层先行处理）
              */
              action => {
                  // do something when action!==object 
                  if (typeof action === 'function') {
                      return action(dispatch, getState);
                  }
                  // default : store.dispatch(action)
                  return next(action);
              }
  }
  // 函数式调用
  // middleware({ getState, dispatch }) => next => action=> typeof action === 'function' ? action(dispatch, getState) : next(action)
  // 非函数式调用（当然不支持，只是便于理解）
  // function middleware({dispatch,getState,next,action})=>{
          // do something when action!==object 
          // default store.dispatch(action)
          //return next(action);
  // }
 
  ```

 

  
### 参考
- https://redux.js.org/api/applymiddleware