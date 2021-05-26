import { View } from '@tarojs/components'
import './index.scss'

const Index = function(props){
  let {show} = props;
  return (<View className={'popup '+show?'popup_show':'popup_hide'}>
      <View className='popup_bg'></View>
      <View className='popup_content'>

      </View>
  </View>)
}

export default Index
