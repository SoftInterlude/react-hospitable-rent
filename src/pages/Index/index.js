import React from 'react';
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import { httpGet, baseURL } from '../../network'
// 导入导航菜单
import Nav1 from '../../assets/img/nav-1.png'
import Nav2 from '../../assets/img/nav-2.png'
import Nav3 from '../../assets/img/nav-3.png'
import Nav4 from '../../assets/img/nav-4.png'
// 导入组件样式
import './index.css'
import { getCurrentCity } from '../../utils'

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
    isSwiperLoaded: false,
    groups: [],
    news: [],
    curCityName: '上海'
  }

  // 获取轮播图数据
  async getSwipers() {
    const { data: res } = await httpGet('/home/swiper')
    this.setState(() => {
      return {
        swipers: res.body,
        isSwiperLoaded: true
      }
    })
  }

  // 获取租房小组数据
  async getGroups() {
    const { data: res } = await httpGet(
      '/home/groups',
      {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    )
    this.setState({
      groups: res.body
    })
  }

  async getNews() {
    const { data: res } = await httpGet(
      '/home/news',
      {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    )
    this.setState({
      news: res.body
    })
  }

  async componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getNews()
    // 获取当前城市定位
    const { label: curCityName } = await getCurrentCity()
    this.setState({
      curCityName
    })
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
            src={baseURL + item.imgSrc}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </a>
      )
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

  // 渲染租房小组
  renderGroups(item) {
    return (
      <Flex className="group-item" align="center" key={item.id}>
        <Flex.Item>
          <p className="title">{item.title}</p>
          <span className="desc">{item.desc}</span>
        </Flex.Item>
        <Flex.Item>
          <img className="group-item-img" src={baseURL + item.imgSrc} />
        </Flex.Item>
      </Flex>
    )
  }

  //渲染房屋资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.key}>
        <div className="img_wrapper">
          <img src={baseURL + item.imgSrc} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h4 className="title">{item.title}</h4>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        {/* 这里要注意修复轮播图不能自动播放的bug, 原因是获取轮播图数据是异步的，数据还没取到组件就先加载好了 */}
        <div className="swiper">
          {this.state.isSwiperLoaded ? <Carousel autoplay infinite>{this.renderSwipers()}</Carousel> : ''}
          {/* 顶部搜索栏 */}
          <Flex className="search-box">
            {/* 左侧输入区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div className="location" onClick={() => this.props.history.push('/citylist')}>
                <span className="name">{this.state.curCityName}</span>
                <i className="iconfont icon-arrow"></i>
              </div>
              {/* 搜索表单 */}
              <div className="form" onClick={() => this.props.history.push('/search')}>
                <i className="iconfont icon-seach"></i>
                <span className="text">请输入小区或地址</span>
              </div>
            </Flex>
            {/* 右侧地图找房按钮 */}
            <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')}></i>
          </Flex>
        </div>
        {/* 导航菜单 */}
        <Flex className="nav">
          {this.renderNavs()}
        </Flex>
        {/* 租房小组 */}
        <div className="groups">
          <h3>租房小组
            <span className="more">更多</span>
          </h3>
          <Grid
            data={this.state.groups}
            activeStyle
            columnNum={2}
            hasLine={false}
            square={false}
            renderItem={this.renderGroups}
          />
        </div>
        <div className="news">
          <WingBlank size="md">
            <h3 className="news-title">房屋资讯</h3>
            {
              this.renderNews()
            }
          </WingBlank>
        </div>
      </div>
    );
  }
}