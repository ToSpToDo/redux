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
const Redux = lazyLoad(() => import(/* webpackChunkName: "redux" */'../pages/redux/redux'));
const ReduxContainer = lazyLoad(() => import(/* webpackChunkName: "redux" */'../store/redux_thunk/container/reduxContainer'));


// 路由配置
const routes = [
  {path: "/", text: "ReduxContainer", component: ReduxContainer},
  {path: "/redux", text: "Redux", component: Redux},
  {path: "/reduxContainer", text: "ReduxContainer", component: ReduxContainer},
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
