import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom'


import lazyLoad from './lazyload';
import Loading from './loading';
// todo 慎用 ： 会捕捉任意的错误
// import ErrLoading from './errLoading';


//主入口文件

import Index from '../pages/index.jsx';


//pages

//懒加载方式
const Redux_thunk = lazyLoad(() => import(/* webpackChunkName: "redux" */'../pages/redux/redux_thunk'));
const Redux_saga = lazyLoad(() => import(/* webpackChunkName: "redux" */'../pages/redux/redux_saga'));
const ReduxThunkContainer = lazyLoad(() => import(/* webpackChunkName: "redux" */'../store/redux_thunk/container/reduxContainer'));
const ReduxSagaContainer = lazyLoad(() => import(/* webpackChunkName: "redux" */'../store/redux_saga/container/reduxContainer'));


// 路由配置
const routes = [
  {path: "/", text: "", component: ReduxSagaContainer},
  {path: "/redux_thunk", text: "Redux_thunk", component: Redux_thunk},
  {path: "/redux_saga", text: "Redux_saga", component: Redux_saga},
  {path: "/reduxThunkContainer", text: "ReduxThunkContainer", component: ReduxThunkContainer},
  {path: "/reduxSagaContainer", text: "ReduxSagaContainer", component: ReduxSagaContainer},
];


//@formatter:off
const AppRouter = () => (
  <HashRouter>
    <Suspense fallback={Loading()}>
      <Switch>
        <Index>
          {
            routes.map((page, index) => page.component ?
              <Route key={index} exact path={page.path} component={page.component}/> : "")
          }
        </Index>
      </Switch>
    </Suspense>
  </HashRouter>
);
//@formatter:on

export default AppRouter;
