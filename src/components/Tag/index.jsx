import { Text } from '@tarojs/components'
import './index.scss'

const Index = function(props){
  let {text, type} = props;
  // var type = 'primary'|'success'|'warning'|'danger'
  return <Text className={'tag '+'tag-'+type}>{text}</Text>
}

export default Index
