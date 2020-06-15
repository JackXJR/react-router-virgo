### 使用说明

> 外部使用路由功能极其简单，只需要`添加 Router` 和 `设置路由配置项` 两步操作即可。在 React-Router 的基础上，增加扩展功能：
>
> 1. 支持选择路由：HashRouter，BrowserRouter
> 2. 支持设置路由的转场过渡动画：从右到左的 push 动画，从下到上的 present 动画，无动画

#### 使用 Router

> 在入口文件`App.js`中添加`Router`

```javascript
import React from 'react'
import Router from './router/Router'
import './index.css'

function App() {
  return <Router />
}

export default App
```

`Router` 有几个可选的属性 `useBrowserRouter`, `useAnimatedSwitch`

```
useBrowserRouter: 默认为false，即默认使用 HashRouter, 如果外部设置为 true，怎使用 BrowserRouter

useAnimatedSwitch： 默认为 true，即默认使用转场过渡动画，如果外部设置为 false，则不使用动画
```

#### 设置路由配置项

> 设置路由配置项 `RouterConfig.js`

```javascript
import { Home, Detail, PresentDetail } from './pages/index'

/**
 * 路由配置文件
 *
 * path 路由路径，路径可以带参数，在:后的即为参数，如 '/detail/:id'， 参数为id。必填
 * component 路径对应的组件页面。必填
 * sceneConfig 转场动画配置，支持push和present两种动画，默认使用push动画。选填
 * exact 是否使用精准匹配，默认为true。选填
 */
export const RouterConfig = [
  { path: '/', component: Home },
  { path: '/detail/:id', component: Detail },
  {
    path: '/present/detail',
    component: PresentDetail,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
]
```
