import React from 'react'
// 导入TabBar组件
import { TabBar } from 'antd-mobile';
import { Outlet, useNavigate } from 'react-router-dom'
// 导入组件自己的样式
import './index.css'


// 抽象NavItem数据
const navItems = [
  {
    icon: 'icon-ind',
    title: '主页',
    path: '../home'
  },
  {
    icon: 'icon-findHouse',
    title: '找房',
    path: 'houselist'
  },
  {
    icon: 'icon-infom',
    title: '资讯',
    path: 'news'
  },
  {
    icon: 'icon-my',
    title: '我的',
    path: 'profile'
  },
]

// 给TabBar包一层组件，原因是要兼容Ant Design Mobile V2.3和React Router V6必须在函数组件中实现声明式导航
function HomeWrapper(props) {
  const navigate = useNavigate()

  function renderTabBarItems() {
    const { selectedTab, onPressCb } = props
    return navItems.map(item => {
      const { icon, title, path } = item
      return <TabBar.Item
        icon={<i className={`iconfont ${icon}`} />}
        selectedIcon={<i className={`iconfont ${icon}`} />}
        title={title}
        key={title}
        selected={selectedTab === path}
        onPress={() => {
          onPressCb(path)
          navigate(path)
        }}
      />
    })
  }

  return <div className="home">
    <Outlet />
    <TabBar
      tintColor="#21b97a"
      barTintColor="white"
      noRenderContent
    >
      {renderTabBarItems()}
    </TabBar>
  </div>
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'index'
    }
  }

  onPressCb = (path) => {
    this.setState(() => {
      return {
        selectedTab: path
      }
    })
  }

  render() {
    return <HomeWrapper selectedTab={this.state.selectedTab} onPressCb={this.onPressCb} />
  }
}