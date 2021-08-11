import { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store'
import './app.scss'
import {dealOptions} from './utils/platform';

const store = configStore()

class App extends Component {

  componentDidMount () {}

  componentDidShow (options) {
    dealOptions(options);
  }

  componentDidHide () {}

  componentDidCatchError () {}

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
