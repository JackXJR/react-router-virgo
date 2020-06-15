import React from 'react'

export default class Detail extends React.Component {
  componentDidMount() {
    // 打印通过路由传递的参数
    console.log(this.props.match.params)
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
    backgroundColor: 'orange',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { marginTop: 10 },
}
