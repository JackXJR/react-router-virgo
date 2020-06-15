#### 原理说明

### React-Router

[react-router-dom](https://www.jianshu.com/p/8954e9fb0c7e)

### 路由转场动画

[路由转场动画](https://www.jianshu.com/p/98fb143ac719)

> 使用`react-router-dom`中的 `HashRouter` 和 `Route` 实现路由功能，封装 `AnimatedSwitch` 组件实现路由转场动画

```javascript
import React from 'react'
import { HashRouter, Route, BrowserRouter } from 'react-router-dom'
import AnimatedSwitch from './AnimatedSwitch'
import { RouterConfig } from './routerConfig'

const BasicRoute = () => (
  // 这里使用 HashRouter , 也可以使用 BrowserRouter
  <HashRouter>
    {/* 添加路由转场动画 */}
    <AnimatedSwitch>
      {RouterConfig.map((config, index) => {
        return <Route exact key={index} {...config} />
      })}
    </AnimatedSwitch>
  </HashRouter>
)

export default BasicRoute
```

`Container`具体实现如下：

```javascript
class Container extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
```

> 使用 `react-transition-group`中的`TransitionGroup`和`CSSTransition`实现转场动画效果

```javascript
```
