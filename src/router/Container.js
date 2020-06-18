import React from 'react'
import { withRouter } from 'react-router-dom'

class Container extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(Container)
