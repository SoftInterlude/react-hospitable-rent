import React from 'react';
import { Carousel, Flex } from 'antd-mobile';
import Axios from 'axios';
// 导入导航菜单
import Nav1 from '../../assets/img/nav-1.png'
import Nav2 from '../../assets/img/nav-2.png'
import Nav3 from '../../assets/img/nav-3.png'
import Nav4 from '../../assets/img/nav-4.png'
// 导入组件样式
import './index.css'

const baseUrl = 'http://192.168.1.6:8080'

const navItems = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  },
]

export default class Index extends React.Component {
  state = {
    swipers: [],
    isSwiperLoaded: false
  }

  async getSwipers() {
    const { data: res } = await Axios.get(`${baseUrl}/home/swiper`)
    this.setState(() => {
      return {
        swipers: res.body,
        isSwiperLoaded: true
      }
    })
  }

  componentDidMount() {
    this.getSwipers()
  }

  // 渲染轮播图
  renderSwipers() {
    return this.state.swipers.map(
      item => (
        <a
          key={item.id}
          href="#"
          style={{ display: 'inline-block', width: '100%', height: 212 }}
        >
          <img
            src={baseUrl + item.imgSrc}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </a>)
    )
  }

  // 渲染导航菜单
  renderNavs() {
    return navItems.map(
      item =>
        <Flex.Item
          key={item.id}
          onClick={() => this.props.history.push(item.path)}
        >
          <img src={item.img} />
          <h2>{item.title}</h2>
        </Flex.Item>
    )
  }

  render() {
    return (
      <div className="index">
        {/* 这里要注意修复轮播图不能自动播放的bug, 原因是获取轮播图数据是异步的，数据还没取到组件就先加载好了 */}
        <div className="swiper">
          {this.state.isSwiperLoaded ? <Carousel autoplay infinite>{this.renderSwipers()}</Carousel> : ''}
        </div>
        <Flex className="nav">
          {this.renderNavs()}
        </Flex>
      </div>
    );
  }
}