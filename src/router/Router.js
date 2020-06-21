import React from 'react'
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import AnimatedSwitch from './AnimatedSwitch'
import StackSwitch from './StackSwitch'
import { WrappedAnimatedRoute } from './WrapedComp'

const PropTypes = require('prop-types')

// Transition animation type configuration
// 转场动画类型配置
export const SceneConfig = {
  // No animation configuration
  // 无动画配置
  NONE: {
    enter: 'no-animation',
    exit: 'no-animation',
  },

  // Push animation configuration
  // Push动画配置
  PUSH: {
    enter: 'from-right',
    exit: 'to-right',
  },

  // Present animation configuration
  // Present动画配置
  PRESENT: {
    enter: 'from-bottom',
    exit: 'to-bottom',
  },
}

class Router extends React.Component {
  static propTypes = {
    // By default, HashRouter is used. If 'usebrowserrouter' is set externally, BrowserRouter is used
    // 默认使用 HashRouter, 如果外部设置useBrowserRouter，则使用 BrowserRouter
    useBrowserRouter: PropTypes.bool,
    // Transition transition animation is used by default. If the external setting is false, no animation is used
    // 默认使用转场过渡动画，如果外部设置为false，则不使用动画
    useAnimatedSwitch: PropTypes.bool,
    // Similar to the native route effect, When you open or close a page, the previous page will not be destroyed
    // 完全类似native路由效果，打开和关闭页面时，均不销毁上一级页面
    useStackSwitch: PropTypes.bool,
    // Routing configuration table
    // 路由配置表
    routerConfig: PropTypes.array.isRequired,
  }

  render() {
    const {
      useBrowserRouter = false,
      useAnimatedSwitch = true,
      useStackSwitch = false,
      routerConfig = [],
    } = this.props

    // By default, HashRouter is used. If 'useBrowserRouter' is set externally, BrowserRouter is used
    // 默认使用 HashRouter, 如果外部设置useBrowserRouter，则使用 BrowserRouter
    const CommonRouter = useBrowserRouter ? BrowserRouter : HashRouter

    /**
     * If `useStackSwitch` is set, the native routing effect of the page is not destroyed
     * If `useStackSwitch` is not set and `useAnimatedSwitch` is set to false, the non animated routing effect is used
     * If `useStackSwitch` and `useAnimatedSwitch` are not set, the routing effect of the destroy page is used by default

     * 如果设置了useStackSwitch，则使用不销毁页面的native路由效果
     * 如果未设置useStackSwitch，且useAnimatedSwitch设置为false，则使用无动画的路由效果
     * 如果未设置useStackSwitch和useAnimatedSwitch，则默认使用销毁页面的路由效果
     * */
    const CommonSwitch = useStackSwitch
      ? StackSwitch
      : useAnimatedSwitch
      ? AnimatedSwitch
      : Switch

    return (
      <CommonRouter>
        <CommonSwitch {...this.props}>
          {useStackSwitch
            ? null
            : routerConfig.map((config, index) => {
                return (
                  <Route
                    exact
                    key={index}
                    {...config}
                    component={WrappedAnimatedRoute(config.component)}
                  />
                )
              })}
        </CommonSwitch>
      </CommonRouter>
    )
  }
}

export default Router
