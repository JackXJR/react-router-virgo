import React from 'react';
import { withRouter } from 'react-router-dom';
import { WrappedStackRoute } from './WrapedComp';
import './StackSwitch.css';

const PropsTypes = require('prop-types');

const DEFAULT_SCENE_CONFIG = {
  enter: 'from-right',
  exit: 'to-right',
};

// 获取转场动画配置项
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

// 获取location匹配的组件
const getMatchedComponent = (location, routerConfig = []) => {
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
  return matchedRoute && matchedRoute.component;
};

let routerPages = [];
let oldRouterPages = [];
let Pages = [];
let oldLocation = null;

class StackSwitch extends React.Component {
  static propsTypes = {
    routerConfig: PropsTypes.array.isRequired, //路由配置信息
  };

  constructor(props) {
    super(props);

    this.state = {
      hidePage: false,
      classNames: '',
      Pages: [],
      isClosePage: false,
    };

    this._isMounted = false;

    const { location, history } = this.props;
    let _this = this;
    _this._pendingLocation = location;

    history.listen(function (location) {
      if (_this._isMounted) {
        _this.refreshPage(location);
      } else {
        _this._pendingLocation = location;
      }
    });
  }

  componentDidMount() {
    let _this = this;
    _this._isMounted = true;
    if (_this._pendingLocation) {
      _this.refreshPage(_this._pendingLocation);
      this._pendingLocation = null;
    }
  }

  // 监听路由的history的变化，刷新页面
  refreshPage(location) {
    const { history, routerConfig } = this.props;

    let classNames = '';
    let isClosePage = false;
    let matchedComponent = getMatchedComponent(location, routerConfig);
    if (history.action === 'PUSH') {
      // 打开页面的动画，从配置项中获取，默认从右至左
      classNames = 'forward-' + getSceneConfig(location, routerConfig).enter;
      matchedComponent && routerPages.push(matchedComponent);
      Pages = routerPages;
      isClosePage = false;
    } else if (history.action === 'POP' && oldLocation) {
      // 关闭页面的动画，从配置项中获取，默认从左至右
      classNames = 'back-' + getSceneConfig(oldLocation, routerConfig).exit;
      routerPages.pop();
      Pages = oldRouterPages;
      isClosePage = true;
    } else {
      matchedComponent && routerPages.push(matchedComponent);
      Pages = routerPages;
      isClosePage = false;
    }

    // 更新旧location
    oldLocation = location;
    oldRouterPages = [].concat(routerPages);

    this.setState({
      classNames,
      Pages,
      routerPages,
      isClosePage,
    });
  }

  render() {
    const { classNames, Pages } = this.state;
    if (!Pages.length) return null;
    return (
      <React.Fragment>
        {Pages.map((Page, index) => {
          if (Page) {
            const className =
              index === Pages.length - 1
                ? classNames + '-active'
                : index === Pages.length - 2
                ? classNames
                : classNames + '-hide';
            return React.createElement(
              WrappedStackRoute(Page, className, index),
              Object.assign({}, { key: index }, { ...this.props }),
              null
            );
          }
          return null;
        })}
      </React.Fragment>
    );
  }
}

export default withRouter(StackSwitch);
