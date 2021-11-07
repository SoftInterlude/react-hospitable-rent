import React from 'react'
// 导入TabBar组件
import { TabBar } from 'antd-mobile';
// 导入组件自己的样式
import './index.css'
import { Outlet, Navigate } from 'react-router-dom'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
    };
  }

  render() {
    return (
      <div className="home">
        <TabBar
          tintColor="#21b97a"
          barTintColor="white"
          noRenderContent
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={<i className="iconfont icon-ind" />}
            selectedIcon={<i className="iconfont icon-ind" />}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
              // this.navigate('/home/index')
              return <Navigate to="/home/index" />
            }}
            data-seed="logId"
          >
            <Outlet />
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-findHouse" />}
            selectedIcon={<i className="iconfont icon-findHouse" />}
            title="找房"
            key="Koubei"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
              // this.navigate('/home/list')
            }}
            data-seed="logId1"
          >
            <Outlet />
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-infom" />}
            selectedIcon={<i className="iconfont icon-infom" />}
            title="资讯"
            key="Friend"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
              // this.navigate('/home/news')
            }}
          >
            <Outlet />
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-my" />}
            selectedIcon={<i className="iconfont icon-my" />}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
              // this.navigate('/home/my')
            }}
          >
            <Outlet />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}