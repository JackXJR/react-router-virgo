### react-router-virgo 使用手册

一行代码 + 一个路由配置文件，就可以实现 react-router 的功能，并让你的页面切换达到匹配 Native 路由的转场动画体验

![Demo 演示](./resources/home.png ':size=320x568')

#### 一、概述

- [详细文档](https://jackxjr.github.io/react-router-virgo/)
- [Demo](https://github.com/JackXJR/react-router-virgo)
  > [react-router-virgo](https://github.com/JackXJR/react-router-virgo)是在 react-router 的基础上进行二次封装的 Router，使集成路由功能变得极其简单，只需要 `设置路由配置项`和 `添加 Router` 两步操作即可。此外，还增加了路由转场动画等扩展功能：
  >
  > 1. 通过设置组件`Router`的属性`useBrowserRouter`，即可选择路由类型：HashRouter，BrowserRouter
  > 2. 通过设置路由配置文件`RouterConfig.js`的`sceneConfig`，即可选择路由转场过渡动画类型：无转场动画、从右到左翻开的 push 转场动画、从下到上弹起的 present 转场动画

#### 二、安装 Router

```
### 使用npm
npm install --save react-router-virgo

### 使用yarn
yarn add react-router-virgo
```

#### 三、 设置路由配置项

> 设置路由配置项 `RouterConfig.js`

##### 3.1 代码演示

```javascript
import { Home, Detail, PushDetail, PresentDetail } from './pages/index';

// 例举了无动画、push转场动画、present转场动画三种场景
export const RouterConfig = [
  { path: '/', component: Home },
  // 无转场动画（新页面直接覆盖当前页面）
  {
    path: '/detail/:type',
    component: Detail,
    sceneConfig: {
      enter: 'no-animation',
      exit: 'no-animation',
    },
  },
  // push 转场动画（打开时，从左往右覆盖；关闭时，从右往左收回）
  {
    path: '/push/detail/:type/:id',
    component: PushDetail,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right',
    },
  },
  // present 转场动画（打开时，从下往上弹起；关闭时，从上往下收起）
  {
    path: '/present/detail',
    component: PresentDetail,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
];
```

##### 3.2 配置项说明

| key           | 说明                                                                              | 类型   | 默认值                                    |      |
| ------------- | --------------------------------------------------------------------------------- | ------ | ----------------------------------------- | ---- |
| `path`        | 路由路径，可以带参数，在`/:`后的为参数，如 `/detail/:id`， 参数为 id              | string |                                           | 必传 |
| `component`   | 路由路径映射的页面组件                                                            | class  |                                           | 必传 |
| `sceneConfig` | 路由转场动画配置，支持无动画、push 动画、present 动画三种场景，默认使用 push 动画 | object | `{enter: 'from-right', exit: 'to-right'}` | 可选 |
| `exact`       | 是否使用精准匹配                                                                  | bool   | true                                      | 可选 |

- 路由转场动画参数`sceneConfig`配置，支持以下三种场景

```
1.无动画配置：{
  enter: 'no-animation',
  exit: 'no-animation',
}
2.push动画配置: {
  enter: 'from-right',
  exit: 'to-right',
}
3.present动画配置: {
  enter: 'from-bottom',
  exit: 'to-bottom',
}
```

#### 四、添加 Router

> 在入口文件`App.js`中添加`Router`

##### 4.1 代码演示

```javascript
import React from 'react';
import Router from './router/Router';
import { RouterConfig } from './RouterConfig';
import './index.css';

function App() {
  // RouterConfig 为路由配置文件
  return <Router routerConfig={RouterConfig} />;
}

export default App;
```

##### 4.2 API 说明

| 属性                | 说明                                                   | 类型  | 默认值 |      |
| ------------------- | ------------------------------------------------------ | ----- | ------ | ---- |
| `routerConfig`      | 路由配置数据                                           | array | []     | 必传 |
| `useBrowserRouter`  | 路由类型 BrowserRouter/HashRouter，默认使用 HashRouter | bool  | false  | 可选 |
| `useAnimatedSwitch` | 是否使用转场过渡动画                                   | bool  | true   | 可选 |

如果

#### 五. 常见问题

> Q：支持哪些路由类型？

目前支持 BrowserRouter 和 HashRouter 两种类型，可通过属性`useBrowserRouter`来设置，默认使用 HashRouter

> Q：支持哪些转场动画？

目前支持无动画、从下往上弹起的 Present 动画，从右往左打开的 Push 动画三种场景。可以在路由配置文件中按规则配置`sceneConfig`即可，如果未配置 sceneConfig 字段，则默认使用 Push 动画

> Q：打开新页面后，上一级页面是否会被销毁？

会被销毁，返回上一级页面时，页面会重新渲染，后续版本迭代会支持 Stack 路由功能。

> Q：安装后，编译失败的原因？

确认下项目里是否有 `react-router-dom`、`react-transition-group` 这 2 个依赖，如果没有，请通过 yarn 或者 npm 引入依赖

```
npm i react-router-dom react-transition-group
```

> Q：是否支持 ts 开发的项目

后续迭代会支持

#### 六. 其它

更具体的信息大家感兴趣的话去看代码吧，如果发现 bug， 请在 [git](https://github.com/JackXJR/react-router-virgo) 上提一个 issue...

> 欢迎使用，觉得不错请给一个小小的 star 鼓励一下~
