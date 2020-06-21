import React from 'react';
import { Button, Title, Toast } from './components';

export default class ReplacePage extends React.Component {
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
        <Toast title={'页面正在加载中...'} />
      </div>
    );
  }
}

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
