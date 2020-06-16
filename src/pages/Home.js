import React from 'react'
import Button from './components/Button'
import Title from './components/Title'

export default class Home extends React.Component {
  gotoPage(pathname, query) {
    this.props.history.push({ pathname, query })
  }

  componentDidMount() {
    console.log('Home首页加载完成')
  }

  render() {
    return (
      <div style={styles.container}>
        <Title title="Home首页" />
        <Button
          title="无动画打开页面"
          onClick={() => this.gotoPage('/detail/无动画')}
        />
        <Button
          title="Push动画打开页面"
          onClick={() => this.gotoPage('/push/detail/Present动画/1234')}
        />
        <Button
          title="Present动画打开页面"
          onClick={() =>
            this.gotoPage('/present/detail', { type: 'Present动画', id: 1234 })
          }
        />
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}
