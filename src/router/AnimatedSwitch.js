import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AnimatedSwitch.css';

const PropsTypes = require('prop-types');

const DEFAULT_SCENE_CONFIG = {
  enter: 'from-right',
  exit: 'to-right',
};

const getSceneConfig = (location, routerConfig = []) => {
  const matchedRoute = routerConfig.find((config) => {
    let paramIndex = config.path.indexOf('/:');
    if (paramIndex === -1) {
      return config.path === location.pathname;
    } else {
      let configPath = config.path.slice(paramIndex).split('/:'),
        locationPath = location.pathname.slice(paramIndex).split('/');
      return (
        location.pathname.indexOf(config.path.slice(0, paramIndex)) === 0 &&
        configPath.length === locationPath.length
      );
    }
  });
  return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG;
};

let oldLocation = null;
class AnimatedSwitch extends React.Component {
  static propsTypes = {
    routerConfig: PropsTypes.array.isRequired,
  };

  render() {
    const { location, history, children, routerConfig } = this.props;
    let classNames = '';
    if (history.action === 'PUSH') {
      // 打开页面的动画，从配置项中获取，默认从右至左
      classNames = 'forward-' + getSceneConfig(location, routerConfig).enter;
    } else if (history.action === 'POP' && oldLocation) {
      // 关闭页面的动画，从配置项中获取，默认从左至右
      classNames = 'back-' + getSceneConfig(oldLocation, routerConfig).exit;
    }

    // 更新旧location
    oldLocation = location;

    // 设置转场动画时长
    let useAnimation = classNames.indexOf('no-animation') === -1;
    return (
      <TransitionGroup
        className={'router-wrapper'}
        childFactory={(child) => React.cloneElement(child, { classNames })}
      >
        <CSSTransition timeout={useAnimation ? 300 : 0} key={location.pathname}>
          <Switch location={location}>{children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(AnimatedSwitch);
