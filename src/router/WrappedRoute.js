import React from 'react'
import Container from './Container'

function WrappedRoute(WrappedComponent) {
  return class WrappedRoute extends React.Component {
    render() {
      return (
        <Container>
          <WrappedComponent {...this.props} />
        </Container>
      )
    }
  }
}

export { WrappedRoute }
