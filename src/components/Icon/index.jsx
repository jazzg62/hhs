import {Image} from '@tarojs/components';
import './index.scss'
import chongzhi from '../../assets/chongzhi.svg'
import check from '../../assets/check.svg'
import success from '../../assets/success.svg'

function Index(props){
  let _ = '';
  console.log('Icon Props',props);
  switch(props.name){
    case 'chongzhi':
      _ = chongzhi;
      break;
    case 'check':
      _=check;
      break;
    case 'success':
      _=success;
      break;
    default:
      throw new Error('请设置一个可用的图标！');
  }

  console.log(_);
  const reg = /fill="(#[\dA-Z]{3,6})"/g;
  if(props.color){
    _.replaceAll(reg, props.color)
  }
  console.log(_);
  return <Image src={_}></Image>
}

export default Index
