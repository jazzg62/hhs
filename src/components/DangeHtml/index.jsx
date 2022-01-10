import { ScrollView } from '@tarojs/components'
import './index.scss'


export default function(props){
  const html = props.html
  return <ScrollView scrollY dangerouslySetInnerHTML={{ __html: html }}></ScrollView>
}
