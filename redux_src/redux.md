## redux
- 采用函数式编程的状态集中管理
- src：源码结构简洁清晰

### compose
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
- 解释：
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
  // 非函数式调用
  // function middleware({dispatch,getState,next,action})=>{
          // do something when action!==object 
          // default store.dispatch(action)
          //return next(action);
  // }
  let store = createStore(
    combineReducers(yourReducers={}),
    // composable: 顺序无关性
    applyMiddleware(...[middleware])
  );
  ```
  
### 参考
- https://redux.js.org/api/applymiddleware