## react-router-virgo 使用手册

One line of code and one route configuration file, realize the function of `react-router`, and match the transition animation effect of native route.

一行代码 + 一个路由配置文件，就可以实现 `react-router` 的功能，并让你的 Web 页面切换媲美 Native 路由的转场动画体验

### 一、Brief Introduction 概述

> [react-router-virgo](https://github.com/JackXJR/react-router-virgo) is a router with secondary encapsulation based on `react-router`, which makes the integrated routing function extremely simple. In addition, the extended functions such as route transition animation are added: `No transition animation`, `push transition animation`, `present transition animation`
>
> [react-router-virgo](https://github.com/JackXJR/react-router-virgo)是在 react-router 的基础上进行二次封装的 Router，使集成路由功能变得极其简单。此外，还增加了路由转场动画等扩展功能：`无转场动画`, `Push 转场动画`, `Present 转场动画`
<div  align="center">   
<img src="https://user-gold-cdn.xitu.io/2020/6/24/172e3ee104ac73b3?w=640&h=1164&f=gif&s=410920" width = "320" height = "570" align=center />
</div>


### 二、Installation 安装

```
### use npm
### 使用npm
npm install --save react-router-virgo

### use yarn
### 使用yarn
yarn add react-router-virgo
```

### 三、RouterConfig 设置路由配置文件

> Set route profile `RouterConfig.js`
>
> 设置路由配置文件 `RouterConfig.js`

#### 3.1 Example 代码演示

```javascript
import { Home, Detail } from './pages/index'

// Three scenes are exemplified: no animation, push transition animation and present transition animation
// 例举了无动画、push转场动画、present转场动画三种场景
export const RouterConfig = [
  { path: '/', component: Home },
  // No transition animation (the new page directly covers the current page)
  // 无转场动画（新页面直接覆盖当前页面）
  {
    path: '/detail',
    component: Detail,
    sceneConfig: {
      enter: 'no-animation',
      exit: 'no-animation',
    },
  },
  // Push transition animation (when opening the page, overwrite from left to right; when closing the page, withdraw from right to left)
  // Push 转场动画（打开页面时，从左往右覆盖；关闭页面时，从右往左收回）
  {
    path: '/push/detail',
    component: Detail,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right',
    },
  },
  // Present transition animation (when opening the page, it will pop up from the bottom; when closing the page, it will pop up from the top)
  // Present 转场动画（打开页面时，从下往上弹起；关闭页面时，从上往下收起）
  {
    path: '/present/detail',
    component: Detail,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
]
```

#### 3.2 RouterConfig Description 配置项说明

| key           | description                                                                                                                                                                                                                                          | type   | default                                   |            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------- | ---------- |
| `path`        | The routing path can take parameters. The one after `/:` is a parameter, such as `/ detail /: id`. The parameter is id. 路由路径，可以带参数，在`/:`后的为参数，如 `/detail/:id`， 参数为 id                                                         | string |                                           | `Required` |
| `component`   | Page components of route path mapping. 路由路径映射的页面组件                                                                                                                                                                                        | class  |                                           | `Required` |
| `sceneConfig` | The route transition animation configuration supports three scenes: `no animation`, `push animation` and `present animation`. The default is push animation. 路由转场动画配置，支持`无动画`、`Push 动画`、`Present 动画`三种场景，默认使用 Push 动画 | object | `{enter: 'from-right', exit: 'to-right'}` | `Optional` |
| `exact`       | Use exact match or not. 是否使用精准匹配                                                                                                                                                                                                             | bool   | true                                      | `Optional` |

- Routing transition animation parameter `sceneConfig` configuration supports the following three scenarios
- 路由转场动画参数`sceneConfig`配置，支持以下三种场景

```
### No animation configuration
### 无动画配置
{
  enter: 'no-animation',
  exit: 'no-animation',
}

### Push animation configuration
### Push动画配置
{
  enter: 'from-right',
  exit: 'to-right',
}

### Present animation configuration
### Present动画配置
{
  enter: 'from-bottom',
  exit: 'to-bottom',
}
```

### 四、Use Router 使用路由

> Add `Router` to entry file `App.js`
>
> 在入口文件`App.js`中添加`Router`

#### 4.1 Example 代码演示

```javascript
import React from 'react'
import Router from './router/Router'
import { RouterConfig } from './RouterConfig'
import './index.css'

function App() {
  return <Router routerConfig={RouterConfig} />
}

export default App
```

#### 4.2 API

| props               | description                                                                                                                         | type  | default |            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ---------- |
| `routerConfig`      | Route configuration data. 路由配置数据                                                                                              | array | []      | `Required` |
| `useBrowserRouter`  | Routing type `BrowserRouter/HashRouter`. By default, HashRouter is used. 路由类型 `BrowserRouter/HashRouter`，默认使用 `HashRouter` | bool  | false   | `Optional` |
| `useAnimatedSwitch` | Use transition animation or not. 是否使用转场过渡动画                                                                               | bool  | true    | `Optional` |

### 五. FAQ 常见问题

> Q: Which routing types are supported?
> 支持哪些路由类型？

- Two types of `BrowserRouter` and `HashRouter` are supported. They can be set by the property `useBrowserRouter`. The default is HashRouter
- 目前支持 BrowserRouter 和 HashRouter 两种类型，可通过属性`useBrowserRouter`来设置，默认使用 HashRouter

> Q: What transition animations are supported?
> 支持哪些转场动画？

- It supports three kinds of scenes: no animation, pop-up presentation animation, and right to left push animation. You can configure `sceneConfig` according to rules in the routing configuration file. If the sceneConfig field is not configured, push animation is used by default
- 目前支持无动画、从下往上弹起的 Present 动画，从右往左打开的 Push 动画三种场景。可以在路由配置文件中按规则配置`sceneConfig`即可，如果未配置 sceneConfig 字段，则默认使用 Push 动画

> Q: After opening a new page, will the previous page be destroyed?
> 打开新页面后，上一级页面是否会被销毁？

- It will be destroyed. When returning to the previous page, the page will be re rendered, and the subsequent version iterations will support the stack routing function.
- 会被销毁，返回上一级页面时，页面会重新渲染，后续版本迭代会支持 Stack 路由功能。

> Q：Why does compilation fail after installation?
> 安装后，编译失败的原因？

- Confirm whether there are two dependencies `react-router-dom` and `react-transition-group` in your project. If not, please import the dependency through yarn or NPM.
- 确认下项目里是否有 `react-router-dom`、`react-transition-group` 这 2 个依赖，如果没有，请通过 yarn 或者 npm 引入依赖.

```
yarn add react-router-dom react-transition-group
```

> Q: Whether the project developed by TS is supported
> 是否支持 ts 开发的项目

- Subsequent iterations will support
- 后续迭代会支持

### 六. More 其它

If you are interested in more specific information, go to the code. If you find a bug, please mention an [issue](https://github.com/JackXJR/react-router-virgo/issues), I will repair and optimize it as soon as possible...

更具体的信息大家感兴趣的话去看代码吧，如果发现 bug，请提一个[issue](https://github.com/JackXJR/react-router-virgo/issues)，我会第一时间进行修复和优化...

> Welcome to use, if you think it's good, please give a little `star` encouragement~
>
> 欢迎使用，觉得不错请给一个小小的 `star` 鼓励一下~
