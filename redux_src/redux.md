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
  - reducer ：每个根reducer就是一个纯函数。实际开发中一般分模块维护各reducer，然后统一导出reducers。
  - preloadedState ：实际项目开发中基本不用，都是各根reducer自行初始化。统一反而不方便维护！
  - enhancer ：有插件存在时（递归处理），return enhancer(createStore)(reducer, preloadedState) 
    - 入参：createStore 函数
    - 返参：新的（处理过 or 加强的） createStore 函数

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
- Arguments
>  ...middleware (arguments): Functions that conform to the Redux middleware API. Each middleware receives Store's dispatch and getState functions as named arguments, and returns a function. That function will be given the next middleware's dispatch method, and is expected to return a function of action calling next(action) with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real store's dispatch method as the next parameter, thus ending the chain. So, the middleware signature is ({ getState, dispatch }) => next => action.
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
- Returns
> (Function) A store enhancer that applies the given middleware. The store enhancer signature is createStore => createStore but the easiest way to apply it is to pass it to createStore() as the last enhancer argument.
- 源码分析

  
### 参考
- https://redux.js.org/api/applymiddleware