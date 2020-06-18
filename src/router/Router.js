import React from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import AnimatedSwitch from './AnimatedSwitch';
import StackSwitch from './StackSwitch';
import { WrappedRoute } from './WrappedRoute';

const PropTypes = require('prop-types');

// 动画类型配置
export const SceneConfig = {
  // 无动画配置
  NONE: {
    enter: 'no-animation',
    exit: 'no-animation',
  },

  // push动画配置
  PUSH: {
    enter: 'from-right',
    exit: 'to-right',
  },

  // present动画配置
  PRESENT: {
    enter: 'from-bottom',
    exit: 'to-bottom',
  },
};

class Router extends React.Component {
  static propTypes = {
    // 默认使用 HashRouter, 如果外部设置useBrowserRouter，则使用 BrowserRouter
    useBrowserRouter: PropTypes.bool,
    // 默认使用转场过渡动画，如果外部设置为false，则不使用动画
    useAnimatedSwitch: PropTypes.bool,
    // 完全类似原生效果，不销毁页面
    useStackSwitch: PropTypes.bool,
    // 路由配置表
    routerConfig: PropTypes.array.isRequired,
  };

  render() {
    const {
      useBrowserRouter = false,
      useAnimatedSwitch = true,
      useStackSwitch = false,
      routerConfig = [],
    } = this.props;

    const CommonRouter = useBrowserRouter ? BrowserRouter : HashRouter;
    const CommonSwitch = useStackSwitch
      ? StackSwitch
      : useAnimatedSwitch
      ? AnimatedSwitch
      : Switch;
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
            );
          })}
        </CommonSwitch>
      </CommonRouter>
    );
  }
}

export default Router;
