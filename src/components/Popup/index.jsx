import { View } from '@tarojs/components'
import './index.scss'

const index = function(props){
  let {show} = props;
  return (<View className='popup' className={show?'popup_show':'popup_hide'}>
      <View className='popup_bg'></View>
      <View className='popup_content'>

      </View>
  </View>)
}

export default index
