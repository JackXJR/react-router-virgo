import React from 'react'
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import AnimatedSwitch from './AnimatedSwitch'
import { WrappedRoute } from './WrappedRoute'

const PropTypes = require('prop-types')

class Router extends React.Component {
  static propTypes = {
    // 默认使用 HashRouter, 如果外部设置useBrowserRouter，则使用 BrowserRouter
    useBrowserRouter: PropTypes.bool,
    // 默认使用转场过渡动画，如果外部设置为false，则不使用动画
    useAnimatedSwitch: PropTypes.bool,
    // 路由配置表
    routerConfig: PropTypes.array.isRequired,
  }

  render() {
    const {
      useBrowserRouter = false,
      useAnimatedSwitch = true,
      routerConfig = [],
    } = this.props
    const CommonRouter = useBrowserRouter ? BrowserRouter : HashRouter
    const CommonSwitch = useAnimatedSwitch ? AnimatedSwitch : Switch
    return (
      <CommonRouter>
        <CommonSwitch {...this.props}>
          {routerConfig.map((config, index) => {
            return (
              <Route
                exact
                key={index}
                {...config}
                component={WrappedRoute(config.component)}
              />
            )
          })}
        </CommonSwitch>
      </CommonRouter>
    )
  }
}

export default Router
