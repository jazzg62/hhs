import { View, Button } from '@tarojs/components'
import React from 'react';
import './index.scss'
import { is_function } from '../../utils/index';

/**
   *
   * 输入光标如何显示？
      如何传递值？
      显示和关闭时的动画
      多个输入值？点击时，怎么复用组件
      遮罩层怎么处理？
      // props:show=false showSidebar=false keyList
  // event: input delete blur done
  // layout:
  // keyboards [{value:1,key:1},{value:2,key:2},{value:3,key:3}, ]
  // sidebar
    */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyList: this.props.keyList,
      keyListLength: this.props.keyList.length
    }
  }

  onInput(val) {
    switch (val) {
      case 'del':
        this.onDelete();
        return;
      case 'done':
        this.onDone();
        return;
    }
    if (is_function(this.props.input))
      this.props.input(val);
    else
      console.warn('未传入处理函数， <NumberKeyboard />需要传入自定义input处理函数， 用于处理输入');
  }

  bind(val){
    return (function(){
      this.onInput(val);
    }).bind(this);
  }

  onDelete() {
    if (is_function(this.props.delete))
      this.props.delete();
    else
      console.warn('未传入处理函数， <NumberKeyboard />需要传入自定义delete处理函数， 用于处理输入');
  }

  onDone() {
    if (is_function(this.props.done))
      this.props.done();
  }

  onBlur(){
    if(is_function(this.props.blur))
      this.props.blur();
  }

  render() {
    return (
      <View className={'number_keyboard ' + (this.props.show ? 'number_keyboard--show' : 'number_keyboard--hide')}  >

        {this.props.show && this.props.mask ? <View className='number_keyboard-mask' onClick={this.onBlur.bind(this)}></View> : null}

        <View className='number_keyboard-body' >
          <View className='number_keyboard-keys'>
            {
              this.state.keyList.map((val, idx) => {
                if (this.state.keyListLength % 3 != 0 && (idx == this.state.keyListLength - 1))
                  return (<View className='number_keyboard-key_wrapper number_keyboard-key_wrapper--wider' key={val}>
                    <Button className='number_keyboard-key' hoverClass='number_keyboard-key--active' hoverStartTime={0} hoverStayTime={0} onClick={this.bind(val)}>{val}</Button>
                  </View>);
                else
                  return (<View className='number_keyboard-key_wrapper' key={idx}>
                    <Button className='number_keyboard-key' hoverClass='number_keyboard-key--active' hoverStartTime={0} hoverStayTime={0} onClick={this.bind(val)}>{val}</Button>
                  </View>);
              })
            }
          </View>

          {
            this.props.showSidebar ? (<View className='number_keyboard-sidebar'>
              <View className='number_keyboard-key_wrapper'>
                <Button className='number_keyboard-key number_keyboard-key--large' hoverClass='number_keyboard-key--active' hoverStartTime={0} hoverStayTime={0} onClick={this.bind('del')}>
                  删除
                </Button>
              </View>
              <View className='number_keyboard-key_wrapper number_keyboard-key_wrapper--wider'>
                <Button className='number_keyboard-key number_keyboard-key--blue number_keyboard-key--large' hoverClass='number_keyboard-key--active1' hoverStartTime={0} hoverStayTime={0} onClick={this.bind('done')}>
                  确定
                </Button>
              </View>
            </View>) : null
          }
        </View>

      </View >);
  }
}

export default Index
