import { Component } from 'react';
import { Provider } from 'react-redux';
import configStore from '../../store';
import {dealOptions} from '../../utils/platform';

const store = configStore();
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
