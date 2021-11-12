import React from 'react'
import { Route } from 'react-router-dom'
// 导入业务组件
import News from '../News'
import Index from '../Index'
import HouseList from '../HouseList'
import Profile from '../Profile'
// 导入TabBar组件
import { TabBar } from 'antd-mobile';
// 导入组件自己的样式
import './index.css'


// tabbar数据
const tabItems = [
  {
    icon: 'icon-ind',
    title: '主页',
    path: '/home'
  },
  {
    icon: 'icon-findHouse',
    title: '找房',
    path: '/home/list'
  },
  {
    icon: 'icon-infom',
    title: '资讯',
    path: '/home/news'
  },
  {
    icon: 'icon-my',
    title: '我的',
    path: '/home/profile'
  },
]

export default class Home extends React.Component {
  state = {
    selectedTab: this.props.location.pathname
  }

  // 修复从首页导航菜单进入子路由，首页部分更新时，对应tab不高亮的问题
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  renderTabBarItems() {
    return tabItems.map(item => {
      const { icon, title, path } = item
      return <TabBar.Item
        icon={<i className={`iconfont ${icon}`} />}
        selectedIcon={<i className={`iconfont ${icon}`} />}
        title={title}
        key={title}
        selected={this.state.selectedTab === path}
        onPress={() => {
          this.setState({
            selectedTab: path
          })
          // 路由跳转
          this.props.history.push(path)
        }}
      />
    })
  }

  render() {
    return <div className="home">
      <Route path="/home/news" component={News} />
      <Route exact path="/home" component={Index} />
      <Route path="/home/list" component={HouseList} />
      <Route path="/home/profile" component={Profile} />
      <TabBar
        tintColor="#21b97a"
        barTintColor="white"
        noRenderContent
      >
        {this.renderTabBarItems()}
      </TabBar>
    </div>
  }
}