import { Component } from 'react'
import Taro from '@tarojs/taro';
import { ScrollView, View, Text } from '@tarojs/components';
import './withdrawlist.scss'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      hasmore: false,
      request: {
        curpage: 1,
        page: 12,
        key: Taro.getApp().globalData.key
      },
      list: []
    }
  }

  componentWillMount() {
    this.request_list();
  }

  load_more_list() {
    console.log('load_more_list');
    if (this.state.isloading || !this.state.hasmore) {
      return
    }
    let { request } = this.state
    this.setState({
      isloading: true,
      hasmore: false,
      request: {
        ...request,
        curpage: request.curpage + 1
      }
    })
    this.request_list()
  }

  request_list() {
    Taro.request({
      url: 'https://www.cnql888.com/mobile/index.php?act=member_tk&op=tktxlb',
      data: this.state.request,
      success: (res) => {
        let list1 = this.state.list;
        list1.push(...res.data.datas.list)
        this.setState({
          list: list1,
          hasmore: res.data.hasmore,
          isloading: false,
        })
      }
    })
  }

  render() {
    let { isloading, hasmore, list } = this.state;
    return (
      <View class='content'>
        <ScrollView class='list flex-column' onScrollToLower={this.load_more_list.bind(this)} scrollY enableFlex>
          {list.map((item) => {
            return <View class='list-item flex-column' key={item.id}>
              <View class='flex-row'>
                <Text class='list-item-name'>分享收益提现</Text>
                <Text class='list-item-money'>￥{item.txje}</Text>
              </View>
              <View>
                <Text class='list-item-time'>{item.addtime}</Text>
              </View>
              <View>
              </View>
              {item.zt==1?<Text class='list-item-tag done'>已发放</Text>:<Text class='list-item-tag sh'>审核中</Text>}
            </View>
          })}

          {(isloading || hasmore) && (
            <View className='more'>
              <View className='spinner'>
                <View className='spinner-item'></View>
              </View>
              <Text className='more-text'>数据加载中</Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

export default Index
