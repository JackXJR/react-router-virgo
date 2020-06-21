import React from 'react';

export default class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showToast: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 1000);
  }

  render() {
    const { title = '' } = this.props;
    if (!this.state.showToast) return null;
    return (
      <div style={styles.container}>
        <div style={styles.title}>{title}</div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    color: '#FFFFFF',
    fontSize: 14,
    maxWidth: '80vw',
    backgroundColor: '#414141',
    borderRadius: 4,
    padding: 10,
    marginTop: -60,
  },
};
