import React from 'react'
import { Button, Title } from './components'

class HybridPage extends React.Component {
  goBack() {
    this.props.history.goBack()
  }
  /**
   * 可以给某一个页面同时配置多种动画，以 PopPage 为例
   *
   * 1.打开配置路径 "/pop-page" 时，无动画
   * 2.打开配置路径 "/push/pop-page" 时，Push动画
   * 3.打开配置路径 "/present/pop-page" 时，Present动画
   */
  render() {
    return (
      <div style={styles.container}>
        <Title title="混合场景页面" />
        <Button title="回到Home首页" onClick={() => this.goBack()} />
        <Button
          title="无动画打开页面"
          onClick={() => this.props.history.push('/pop-page')}
        />
        <Button
          title="Push动画打开页面"
          onClick={() => this.props.history.push('/push/pop-page')}
        />
        <Button
          title="Present动画打开页面"
          onClick={() => this.props.history.push('/present/pop-page')}
        />
      </div>
    )
  }
}

export default HybridPage

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'orange',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}
