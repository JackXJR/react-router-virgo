import { Home, Detail, PushDetail, PresentDetail } from './pages/index'

/**
 * 路由配置文件
 *
 * path 路由路径，路径可以带参数，在:后的即为参数，如 '/detail/:id'， 参数为id。必填
 * component 路径对应的组件页面。必填
 * sceneConfig 转场动画配置，支持无动画、push动画、present动画三种场景，默认使用push动画。选填
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
 * exact 是否使用精准匹配，默认为true。选填
 */
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
]
