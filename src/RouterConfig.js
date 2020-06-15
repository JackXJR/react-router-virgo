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
