# redux
- saga & thunk 都是 Redux_thunk 插件。都是为了解决reducers的纯函数实现导致的异步逻辑问题！
- 共同点：  
  - reducer完全一样（纯函数）！
- 不同点：
  - actions 基础功能都一样（返回action对象）
  - thunk : 拓展action功能以便于支持返回函数，然后在函数的具体逻辑中分发基础的action对象。 
    - 最简化的实现，具体的封装全部交给了使用者。基本没有学习成本，但要更好的组织代码还是需要自己封装&拆分。具体可以参考saga的思想！
  - saga : 保留redux原有的规范。通过子进程监听需要异步处理的action，然后在监听函数中处理异步逻辑&分发action对象
    - 提供了很多辅助函数。同时增加了一点点的学习成本。

## demo
- 目录：src
- 运行（默认是saga的demo）：
  - 1、npm install --save-dev
  - 2、webpack 
  ```js 
    // src/app.js   1、切换 store 的引用  2、重新 webpack
    
    // import store from './store/redux_thunk/index';
    import store from './store/redux_saga/index';
  ```

## redux 源码简析
- [redux.md](./redux_src/redux.md)

## 参考
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
- https://survivejs.com/blog/redux-saga-interview/