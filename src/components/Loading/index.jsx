import { View } from '@tarojs/components'
import {showLoading, hideLoading} from '@tarojs/taro'
import './index.scss'

const Index = function(props){
  let {isLoading} = props;
  if(isLoading){
    showLoading({
      title:'加载中...'
    });
    return <View className='loading'></View>
  }else{
    hideLoading();
    return null;
  }
}

export default Index
