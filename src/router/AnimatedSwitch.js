import React from 'react'
import { Switch, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { RouterConfig } from '../RouterConfig'
import './AnimatedSwitch.css'

const DEFAULT_SCENE_CONFIG = {
  enter: 'from-right',
  exit: 'to-right',
}

const getSceneConfig = (location) => {
  const matchedRoute = RouterConfig.find((config) => {
    // present 打开页面时，路由传参数建议使用query方式传递，否则无法匹配
    return config.path === location.pathname
  })
  return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG
}

let oldLocation = null
class AnimatedSwitch extends React.Component {
  render() {
    const { location, history, children } = this.props
    let classNames = ''
    if (history.action === 'PUSH') {
      // 打开页面的动画，从配置项中获取，默认从右至左
      classNames = 'forward-' + getSceneConfig(location).enter
    } else if (history.action === 'POP' && oldLocation) {
      // 关闭页面的动画，从配置项中获取，默认从左至右
      classNames = 'back-' + getSceneConfig(oldLocation).exit
    }

    // 更新旧location
    oldLocation = location

    return (
      <TransitionGroup
        className={'router-wrapper'}
        childFactory={(child) => React.cloneElement(child, { classNames })}
      >
        <CSSTransition timeout={300} key={location.pathname}>
          <Switch location={location}>{children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default withRouter(AnimatedSwitch)
