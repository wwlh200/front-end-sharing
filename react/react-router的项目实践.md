### 前言
随着单页应用的发展，路由这个词不断出现在我们的视线中，路由跳转，嵌套路由，路由配置，路由懒加载等等，目前整理了业界的一些面试题，带着问题去整理我们需要学习的知识，面试题主要是react技术栈的，如下
- 介绍hash和history的区别
- 如何配置React-Router
- react-router怎么实现路由切换
- 路由的动态加载模块

### hash和history
#### 什么是hash模式
- hash就是指URL的锚部分（从#号开始的部分）。hash也称作锚点，本身是用来做页面定位的，它可以使对应id的元素显示在可视区域内。  
- 由于 hash 值变化不会导致浏览器向服务器发出请求，而且 hash 改变会触发 hashchange 事件，浏览器的进后退也能对其进行控制，所以人们在 html5的history出现前，基本都是使用hash来实现前端路由的。
```
window.location.hash = 'product' // 设置 url 的 hash，会在当前url后加上 '#product'

console.log(window.location.hash) // '#product'  

// 监听hash变化，点击浏览器的前进后退会触发
window.addEventListener('hashchange', function(){ 
    
})

// 或者在body上加上onhashchange
<body onhashchange="myFunction()">
```
- react-router中hashHistory
Hash history 使用 URL 中的 hash（#）部分去创建形如 example.com/#/some/path 的路由。
- hash模式过程
![Ｈash Mode](http://assets.processon.com/chart_image/5ec2903b5653bb6f2a1850a9.png)
#### 什么是history(HTML5的history对象)
History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录(类似栈对象)。常用Api如下
- History.back()
前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 history.go(-1).
- History.forward()
在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 history.go(1).
- History.go()
通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。
- History.pushState()
按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；
- History.replaceState()
按指定的数据，名称和URL(如果提供该参数)，更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。
---
附加window api
- window.onpopstate  

window.onpopstate是popstate事件在window对象上的事件处理程序.
每当处于激活状态的历史记录条目发生变化时,popstate事件就会在对应window对象上触发. 如果当前处于激活状态的历史记录条目是由history.pushState()方法创建,或者由history.replaceState()方法修改过的, 则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝.  

调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).

![Ｈistory Mode](http://assets.processon.com/chart_image/5ec25df7e401fd16f443bee8.png)

### 如何配置React-router
目前我们是基于create-react-app脚手架搭建起来的项目简单配置的，直接上代码
- 1.搭建项目
```
npx create-react-app my-app --typescript
npm install --save react-router-dom
```
- 2.在react-app-env.d.ts里面声明react-router-dom包或者安装@types/react-router-dom解决找不到包的问题
```
declare module "react-router-dom";
```
-  3.在src下面建立pages文件夹，创建Layout.tsx、Page1.tsx、Page2.tsx、Page3.tsx
```
// Layout.tsx
import * as React from "react";
import RouteView, { IRouteViewProps } from "../routes/RouteView";
import { History } from "history";

interface ILayoutProps extends IRouteViewProps {
  history: History;
}

const Layout = (props: ILayoutProps) => {
  const handleClick = React.useCallback((e) => {
    const { name } = e.target;
    props.history.push(name);
  }, [props.history]);

  return (
    <div>
      <div>
        <button name="/basic/page1" onClick={handleClick}>
          Page1
        </button>
        <button name="/basic/page2" onClick={handleClick}>
          Page2
        </button>
        <button name="/basic/page3" onClick={handleClick}>
          Page3
        </button>
      </div>
      <RouteView {...props} />
    </div>
  );
};

export default Layout;

// Page1.tsx
import * as React from "react";

const Page1 = () => {
    return (
        <div>我是Page1</div>
    )
};

export default Page1;

// Page2.tsx
import * as React from "react";

const Page2 = () => {
    return (
        <div>我是Page2</div>
    )
};

export default Page2;

// Page3.tsx
import * as React from "react";

const Page3 = () => {
    return (
        <div>我是Page3</div>
    )
};

export default Page3;

```
-  4.在src下面建立routes文件夹，创建router.config.ts和RouteView.tsx
```
// router.config.ts
import Layout from "../pages/Layout";
import { lazy } from "react";
const RouteConfig = [
  {
    path: "/basic",
    component: Layout,
    children: [
      {
        path: "/basic/page1",
        component: lazy(() => import("../pages/Page1")),
      },
      {
        path: "/basic/page2",
        component: lazy(() => import("../pages/Page2")),
      },
      {
        path: "/basic/page3",
        component: lazy(() => import("../pages/Page3")),
      },
      { path: "/basic", redirect: "/basic/page1" },
    ],
  },
  // {
  //   path: "/login",
  //   component: lazy(() => import("../pages/Login")),
  // },
  {
    path: "/",
    redirect: "/basic",
  },
];

export default RouteConfig;

// RouteView.tsx
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export interface IRouteViewProps {
  path?: string;
  redirect?: string;
  component?: any;
  children?: IRouteViewProps[];
}

const RouteView = (props: IRouteViewProps) => {
  return (
    <Switch>
      {props.children &&
        props.children.map((item, index) => {
          if (item.redirect) {
            return (
              <Redirect
                key={index}
                from={item.path}
                to={item.redirect}
              ></Redirect>
            );
          }
          return (
            <Route
              key={index}
              path={item.path}
              render={(props) => {
                return (
                  item.component && (
                    <item.component
                      children={item.children}
                      {...props}
                    ></item.component>
                  )
                );
              }}
            ></Route>
          );
        })}
    </Switch>
  );
};

export default RouteView;

```
- 5.修改App.tsx
```
// App.tsx
import React, { Suspense } from "react";
import RouteConfig from "./routes/router.config";
import RouteView from "./routes/RouteView";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <RouteView children={RouteConfig}></RouteView>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
```

一个具备路由嵌套，路由懒加载，可配置化的的React-Router就配置好了，代码请参考：https://github.com/wwlh200/react-router-demo

### react-router怎么实现路由切换(基于实践)
- 如果引入了react-router-redux这个库(包含使用dva的情况，dva包含react-router-redux子库)
```
const {history} = props;
history.push("/basic/product");
```
- 如果不使用redux
```
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Product));

const {history} = props;
history.push("/basic/other");
```
- 如果使用react-hooks
```
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```
### 路由的动态加载模块
- React.lazy
```
const Component = React.lazy(() => import('./Component'));
```
缺点：不支持服务端渲染
- loadable-components
```
// 第一步
npm install @loadable/component
// 第二步
const Component = loadable(() => import('./Component'));
```
缺点:需要引入第三方包
- react-loadable
```
import Loadable from "react-loadable";
export default function asyncComponent(comp) {
  return Loadable({
    loader: comp,
    loading: (props) => {
       return "加载中...";
    },
  });
}

import asyncComponent from "../utils/utils";
const Component = asyncComponent(() => import('./Component'));
```
缺点：该方法不建议使用,StrictMode下回报如下警告:　　
The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.
