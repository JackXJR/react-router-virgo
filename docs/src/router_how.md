写过客户端的小伙伴，在写 web 页面的时候，都会觉得页面切换起来很生硬，作为一个从 iOS 开发转前端的我来说，尤其不能接受，因此，基于 react-router 的基础上，写了一个 Router 库 [react-router-virgo](https://github.com/JackXJR/react-router-virgo)，让使用者以极简的方式就可以使 Web 页面切换能达到原生路由切换的动画体验。

### 一、react-router-virgo 简介

这个路由组件还没完全达到我的预期，后面有时间会继续迭代优化。目前这个路由组件支持以下功能：

- 无转场动画切换（现有的 web 页面切换体验）
- push 动画切换（右侧淡入，右侧淡出的 Native 路由切换体验）
- present 动画切换（下方淡入，下方淡出的 Native 路由模态切换体验）
- 支持 HashRouter，BrowserRouter 两种路由

> 总体上，基本能达到 native 路由的切换体验，当然，毕竟是 web 页面，相对于 iOS 的原生的 native 路由体验还是有点差距，感兴趣的也可以 [运行完整 demo](https://github.com/JackXJR/react-router-virgo)体验下。。。

下面我们来简要看一下实现原理吧

简单来说，`react-router-virgo`是在 [react-router](https://reacttraining.com/react-router/web/guides/quick-start) 和 [react-transition-group](https://reactcommunity.org/react-transition-group/#Transition-prop-mountOnEnter) 的基础上进行二次封装的 Router。这里也会分这两部分进行递进分析

### 二、react-router

首先，我们先简要介绍下 react-router 的基本用法（详细看[官网](https://reacttraining.com/react-router/web/guides/quick-start)介绍）。

我们主要使用到 react-router 提供的 HashRouter/BrowserRouter，Switch，Route 三个组件。

#### 2.1 HashRouter/BrowserRouter

react-router 主要提供了两种 Router

- HashRouter: hash 形式实现的路由，使用 `createHashHistory` 创建的 history

- BrowserRouter：以 html5 提供的 history api 形式实现的路由，使用 `createBrowserHistory` 创建的 history

#### 2.2 Route

路由组件，`path` 指定匹配的路由，`component` 指定路由匹配时展示的组件（Route 也可以通过 children 和 render 的形式创建展示的组件）。

```javascript
<Route exact path={'/home'} component={Home} />
```

#### 2.3 Switch

多个 Route 组件同时匹配时，默认都会显示，但是被 Switch 包裹起来的 Route 组件只会显示第一个被匹配上的路由。路由的转场动画，其实就是基于 Switch 进行封装，使页面切换时，具有动画效果。

#### 2.4 代码演示

> 使用`react-router-dom`中的 `HashRouter/BrowserRouter` 、 `Route`、`Switch` 一个简单的无动画路由切换功能，具体如下：

```javascript
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { RouterConfig } from './routerConfig';

const Router = () => (
  // 这里使用 HashRouter , 也可以使用 BrowserRouter
  <HashRouter>
    <Switch>
      {RouterConfig.map((config, index) => {
        return <Route exact key={index} {...config} />;
      })}
    </Switch>
  </HashRouter>
);

export default Router;
```

那怎么让页面切换的时候，带有转场动画效果呢，这就需要结合 react-transition-group 了

### 三、react-transition-group

在介绍实现转场动画之前，我们得先学习如何使用 [react-transition-group](https://reactcommunity.org/react-transition-group/#Transition-prop-mountOnEnter)。基于此，接下来就将对其提供的 `CSSTransition` 和 `TransitionGroup` 这两个组件展开简要介绍。

#### 3.1 CSSTransition

CSSTransition 会自动给包裹的标签添加样式，是一个可以通过设置 css 来实现的过渡动画组件。我们先来看下 CSSTransition 的属性：

| 属性      | 详情                                                          |
| --------- | ------------------------------------------------------------- |
| `in`      | 取值 `true/false`，决定包裹的元素是要进行出场动画还是入场动画 |
| `timeout` | 设置动画时间                                                  |

实际上，CSSTransition 并没有给组件任何动画效果，只是在一段时间内，给包裹的组件加上三个类，这个三类中，我们可以写动画效果。

- in 属性的值从 false 变为 true，就会元素加上下面三个类(这里前缀`xxx` 代指设置的 css 类型，默认是`fade`)，即执行入场动画：

| css 类             | 详情                                                                               |
| ------------------ | ---------------------------------------------------------------------------------- |
| `xxx-enter`        | 入场动画的第一个瞬间（帧）加入的，动画即将结束前消失                               |
| `xxx-enter-active` | `xxx-enter` 加入后，第二个瞬间加入，持续到入场动画即将执行完成，动画即将结束前消失 |
| `xxx-enter-done`   | 入场动画结束瞬间，加入之后一直存在                                                 |

- 相反地，当 in 属性置为 false 时，CSSTransition 会给子组件加上 `xxx-exit`、`xxx-exit-active`、`xxx-exit-done` 的 class。（更多详细介绍可以戳[官网](http://reactcommunity.org/react-transition-group/css-transition)查看）

基于以上两点，我们给打开页面时的 class 设置为`forward-from-right`，则对应的 css 样式：

```javascript
/**
 * 打开页面：右侧淡入，右侧淡出
 */
.forward-from-right-enter {
  z-index: 2;
  transform: translate3d(100%, 0, 0);
}

.forward-from-right-enter-active {
  z-index: 2;
  transform: translate3d(0, 0, 0);
  transition: all 300ms;
}

.forward-from-right-enter-done {
  z-index: 2;
}

.forward-from-right-exit {
  z-index: 1;
  transform: translate3d(0, 0, 0);
}

.forward-from-right-exit-active {
  z-index: 1;
  transform: translate3d(-30%, 0, 0);
  transition: all 300ms;
}

.forward-from-right-exit-done {
  z-index: 1;
}
```

#### 3.2 TransitionGroup

用 CSSTransition 可以实现单个页面的动画，而路由的转场动画需要管理新旧两个页面的联动切换。如何让新旧页面切换的过程中，同时存在两个 DOM 节点，切换结束后，再移除旧节点呢？

为此我们再来介绍 react-transition-group 提供的[TransitionGroup](https://reactcommunity.org/react-transition-group/transition-group)这个组件。

> 如[官网](https://reactcommunity.org/react-transition-group/transition-group)介绍，TransitionGroup 组件就是用来管理一堆节点 mounting 和 unmounting 过程的组件，非常适合处理路由切换的情况。TransitionGroup 在感知到其 children 变化时，会先保存住即将要被移除的节点，而在其动画结束时才会真正移除该节点。

#### 3.2 代码演示

> 使用 `react-transition-group`中的`TransitionGroup`和`CSSTransition` 对 Switch 进行封装，实现路由转场动画组件`AnimatedSwitch`

```javascript
import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AnimatedSwitch.css'; // 动画样式

let oldLocation = null;
class AnimatedSwitch extends React.Component {
  static propsTypes = {
    routerConfig: PropsTypes.array.isRequired,
  };
  render() {
    const { location, history, children, routerConfig } = this.props;
    let classNames = '';
    if (history.action === 'PUSH') {
      // 打开页面的转场动画
      classNames = 'forward-from-right';
    } else if (history.action === 'POP' && oldLocation) {
      // 关闭页面的转场动画
      classNames = 'back-to-right';
    }
    oldLocation = location;
    // 使用 TransitionGroup 和 CSSTransition 包裹 Switch，实现转场动画
    return (
      <TransitionGroup
        className={'router-wrapper'}
        childFactory={(child) => React.cloneElement(child, { classNames })}
      >
        <CSSTransition timeout={300} key={location.pathname}>
          <Switch location={location}>{children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
// 通过 withRouter 包裹，可以从props中获取location，history等对象。
export default withRouter(AnimatedSwitch);
```

至此，路由转场动画算是基本实现了。
