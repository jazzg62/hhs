import { Component } from 'react';
import { Provider } from 'react-redux';
import withWeapp from "@tarojs/with-weapp";
import configStore from '../../store';
import {dealOptions} from '../../utils/platform';
import './app.scss';

const store = configStore();
@withWeapp({
  onLaunch() {},
  globalData: {
    menuButtonBoundingClientRect: '',
    key: '',
    page: 12,
    member_id: 0
  }
}, true)
class App extends Component {

  componentDidShow (options) {
    dealOptions(options);
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
