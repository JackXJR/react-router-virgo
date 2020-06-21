import React from 'react'
import { Button, Title } from './components'

class Home extends React.Component {
  gotoPage(pathname, query) {
    this.props.history.push({ pathname, query })
  }

  render() {
    return (
      <div style={styles.container}>
        <Title title="Home首页" />
        <Button
          title="无动画"
          onClick={() => this.gotoPage('/detail/无动画')}
        />
        <Button
          title="Push动画"
          onClick={() => {
            this.gotoPage('/push/detail/Push动画')
          }}
        />
        <Button
          title="Present动画"
          onClick={() => {
            this.gotoPage('/present/detail/Present动画')
          }}
        />
        <Button
          title="混合场景"
          onClick={() => this.gotoPage('/push/hybrid-page')}
        />
      </div>
    )
  }
}

export default Home

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}
