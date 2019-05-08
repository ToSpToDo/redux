# redux
- saga & thunk 都是 Redux_thunk 插件。
- 共同点：  
  - reducer完全一样（纯函数）！
  - actions 基础功能都一样（返回action对象），thunk : 支持返回函数，然后在函数的具体逻辑中分发基础的action对象。 saga : 保留redux原有的规范
- 不同点：使用方式上（container or pages） thunk（redux原先的调用方式） : dispatch(action(params)) ! saga : action(params)


## thunk
- With a plain basic Redux_thunk store, you can only do simple synchronous updates by dispatching an action. Middleware extend the store's abilities, and let you write async logic that interacts with the store.

- Thunks are the recommended middleware for basic Redux_thunk side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.

## saga


## 参考
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html