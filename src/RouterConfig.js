import { SceneConfig } from 'react-router-virgo'
// import { SceneConfig } from './router/Router'
import { Home, Detail, PopPage, ReplacePage, HybridPage } from './pages/index'

// 无转场动画（新页面直接覆盖当前页面）
// 属性 useAnimatedSwitch 设置为false时，sceneConfig 可不配置
const NoAnimateConfig = [
  {
    path: '/detail/:type',
    component: Detail,
    sceneConfig: SceneConfig.NONE,
  },
  {
    path: '/pop-page',
    component: PopPage,
    sceneConfig: SceneConfig.NONE,
  },
]

// Push 转场动画（打开时，从左往右覆盖；关闭时，从右往左收回）
// 属性 useAnimatedSwitch 未设置，或设置为true时，sceneConfig 可不配置
const PushConfig = [
  {
    path: '/push/detail/:type',
    component: Detail,
    sceneConfig: SceneConfig.PUSH,
  },
  {
    path: '/push/pop-page',
    component: PopPage,
    sceneConfig: SceneConfig.PUSH,
  },
  {
    path: '/push/replace-page',
    component: ReplacePage,
    sceneConfig: SceneConfig.PUSH,
  },
  {
    path: '/push/hybrid-page',
    component: HybridPage,
    sceneConfig: SceneConfig.PUSH,
  },
]

// Present 转场动画（打开时，从下往上弹起；关闭时，从上往下收起）
// sceneConfig 必须设置
const PresentConfig = [
  {
    path: '/present/detail/:type',
    component: Detail,
    sceneConfig: SceneConfig.PRESENT,
  },
  {
    path: '/present/pop-page',
    component: PopPage,
    sceneConfig: SceneConfig.PRESENT,
  },
]

/**
 * 路由配置文件（NoAnimateConfig、PushConfig、PresentConfig）
 *
 * path 路由路径，路径可以带参数，在:后的即为参数，如 '/detail/:id'， 参数为id。必填
 * component 路径对应的组件页面。必填
 * sceneConfig 转场动画配置，支持无动画、push动画、present动画三种场景。选填
 * exact 是否使用精准匹配，默认为true。选填
 */
export const RouterConfig = [{ path: '/', component: Home }]
  .concat(NoAnimateConfig)
  .concat(PushConfig)
  .concat(PresentConfig)
