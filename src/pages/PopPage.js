import React from 'react'
import { Button, Title } from './components'

class PopPage extends React.Component {
  pushPage(pathname, query) {
    this.props.history.push({ pathname, query })
  }

  replacePage(pathname, query) {
    this.props.history.replace({ pathname, query })
  }

  goBack() {
    this.props.history.goBack()
  }

  go(num) {
    this.props.history.go(num)
  }

  href(pathname) {
    window.location.href = pathname
  }

  render() {
    return (
      <div style={styles.container}>
        <Title title="测试ACTION-POP页面" />
        <Button title="props.history.goBack" onClick={() => this.goBack()} />
        <Button title="props.history.go(-1)" onClick={() => this.go(-1)} />
        <Button title="props.history.go(-2)" onClick={() => this.go(-2)} />
        <Button title="window.location.href" onClick={() => this.href('/')} />
      </div>
    )
  }
}

export default PopPage

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'yellow',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}
