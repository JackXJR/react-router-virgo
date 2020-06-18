import React from 'react';
import Button from './components/Button';
import Title from './components/Title';

export default class Detail extends React.Component {
  componentDidMount() {
    // 打印通过路由传递的参数
    console.log('路由参数=>' + JSON.stringify(this.props.match.params));
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div style={styles.container}>
        <Title title="REPLACE测试页面" />
        <Button title="回到Home首页" onClick={() => this.goBack()} />
        <Button
          title="props.history.replace"
          onClick={() => this.props.history.replace('/push/pop-page')}
        />
        <Button
          title="window.location.replace"
          onClick={() => window.location.replace('/push/pop-page')}
        />
        <Button
          title="window.history.replaceState"
          onClick={() =>
            window.history.replaceState({}, '', '/#/push/pop-page')
          }
        />
      </div>
    );
  }
}

// this.props.history.push('/page1')
// window.history.replaceState({}, '', '/#/home?a=1')
// window.history.pushState({}, '', '/#/home?a=1')}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'rgb(97,218,251)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    flexDirection: 'column',
  },
};
