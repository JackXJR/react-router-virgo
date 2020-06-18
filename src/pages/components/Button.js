import React from 'react'

export default class Button extends React.Component {
  render() {
    const { style = {}, title, onClick } = this.props
    let btnStyle = Object.assign({}, styles.button, style)
    return (
      <div
        style={btnStyle}
        onClick={() => {
          onClick && onClick()
        }}
      >
        {title}
      </div>
    )
  }
}

const styles = {
  button: {
    margin: 15,
    backgroundColor: 'rgb(20,120,227)',
    padding: 15,
    color: 'white',
    borderRadius: 5,
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
}
