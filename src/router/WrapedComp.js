import React from 'react';
import './StackSwitch.css';

function WrappedAnimatedRoute(WrappedComponent) {
  return class WrappedAnimatedRoute extends React.Component {
    render() {
      return (
        <div style={styles.container}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

function WrappedStackRoute(WrappedComponent, className, index) {
  return class WrappedStackRoute extends React.Component {
    render() {
      return (
        <div
          className={className}
          style={Object.assign({}, styles.container, {
            zIndex: index + 1,
          })}
          onAnimationEnd={() => {}}
        >
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

export { WrappedAnimatedRoute, WrappedStackRoute };

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    opacity: 1,
  },
};
