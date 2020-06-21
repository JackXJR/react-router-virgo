import React from 'react'
import { Button, Title } from './components'

const PageType = {
  PUSH: 'PUSH',
  PRESENT: 'PRESENT',
  NONE: 'NONE',
}

class Detail extends React.Component {
  constructor(props) {
    super(props)

    let curPath =
      (this.props.history.location && this.props.history.location.pathname) ||
      ''
    // 默认是无动画页面
    this.pageType = PageType.NONE
    if (curPath.indexOf('/push/') === 0) {
      // Push 动画页面
      this.pageType = PageType.PUSH
    } else if (curPath.indexOf('/present/') === 0) {
      // Present 动画页面
      this.pageType = PageType.PRESENT
    }
  }

  goBack() {
    this.props.history.goBack()
  }

  // 根据不同页面类型展示标题
  getTitle() {
    if (this.pageType === PageType.PUSH) {
      return '测试Push动画场景'
    } else if (this.pageType === PageType.PRESENT) {
      return '测试Present动画场景'
    } else {
      return '测试无动画场景'
    }
  }

  // 打开新页面
  pushPage(path) {
    if (this.pageType === PageType.PUSH) {
      // Push 动画
      this.props.history.push('/push' + path)
    } else if (this.pageType === PageType.PRESENT) {
      // Present 动画
      this.props.history.push('/present' + path)
    } else {
      // 无动画
      this.props.history.push(path)
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Title title={this.getTitle(this.pageType)} />
        <Button title="回到Home首页" onClick={() => this.goBack()} />
        <Button
          title="props.history.push"
          onClick={() => this.pushPage('/pop-page')}
        />
        <Button
          title="window.history.pushState"
          onClick={() => window.history.pushState({}, '', '/#/pop-page')}
        />
      </div>
    )
  }
}

export default Detail

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'rgb(97,218,251)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  button: { marginTop: 10 },
}
