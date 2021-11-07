import React from 'react'
import ReactDOM from 'react-dom';
// 导入项目组件
import App from './App';
import Home from './pages/Home'
import Index from './pages/Index'
import HouseList from './pages/HouseList'
import News from './pages/News'
import Profile from './pages/Profile'
import CityList from './pages/CityList'
// 导入antd-mobile样式
import 'antd-mobile/dist/antd-mobile.css'
// import { TabBar } from 'antd-mobile';
// 导入首页样式
import './index.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


ReactDOM.render(
  <Router>
    {/* 配置路由 */}
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home/" element={<Home />}>
          <Route path="index" element={<Index />} />
          <Route path="houselist" element={<HouseList />} />
          <Route path="news" element={<News />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="citylist" element={<CityList />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);