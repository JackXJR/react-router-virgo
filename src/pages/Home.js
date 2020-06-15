import React from 'react'

export default class Home extends React.Component {
  gotoPage(pathname, query) {
    this.props.history.push({ pathname, query })
  }

  componentDidMount() {
    console.log('Home=componentDidMount')
  }

  render() {
    return (
      <div style={styles.container}>
        <button
          style={styles.button}
          onClick={() => this.gotoPage('/detail/1234')}
        >
          push 打开 Detail
        </button>

        <button
          style={styles.button}
          onClick={() => this.gotoPage('/present/detail', { id: 1234 })}
        >
          present 打开 Detail
        </button>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'yellow',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: { marginTop: 10 },
}
