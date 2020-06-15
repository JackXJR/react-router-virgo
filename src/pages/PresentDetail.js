import React from 'react'

export default class PresentDetail extends React.Component {
  componentDidMount() {
    // 打印通过路由传递的参数
    console.log(this.props.location.query)
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div style={styles.container}>
        <button style={styles.button} onClick={() => this.goBack()}>
          回到Home
        </button>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { marginTop: 10 },
}
