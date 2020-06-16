import React from 'react'
import Button from './components/Button'
import Title from './components/Title'

export default class PresentDetail extends React.Component {
  componentDidMount() {
    // 打印通过路由传递的参数
    console.log('路由参数=>' + JSON.stringify(this.props.location.query))
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div style={styles.container}>
        <Title title="Present动画页面" />
        <Button title="回到Home首页" onClick={() => this.goBack()} />
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#6D4DC2',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}
