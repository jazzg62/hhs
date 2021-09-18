import { OfficialAccount } from '@tarojs/components'
import { SM_XS } from "../../constant"


/**
 * 微信关注公众号组件
 * @returns {<element></element>}
 */
const Index = function(){
  if(SM_XS == 'SM_WXPAY'){
    return <OfficialAccount></OfficialAccount>;
  }else{
    return null;
  }
}

export default Index;
