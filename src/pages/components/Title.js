import React from 'react'

export default class Title extends React.Component {
  render() {
    const { title, style } = this.props
    const titleStyle = Object.assign({}, styles.title, style)
    return <div style={titleStyle}>{title}</div>
  }
}

const styles = {
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
}
