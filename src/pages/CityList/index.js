import React from 'react'
import { NavBar } from 'antd-mobile'
import Axios from 'axios'
import { getCurrentCity } from '../../utils'


// 导入组件样式
import './index.css'
// Axios baseUrl
const baseUrl = 'http://192.168.1.6:8080'
// 城市列表数据转换方法
const formatCityData = (list) => {
  const cityList = {}
  const cityIndex = []

  // 使用cityList存储以{a: []}格式的城市列表数据
  // 使用cityIndex存储城市首字母
  list.forEach(item => {
    const firstLetter = item.short.substr(0, 1)
    if (cityIndex.indexOf(firstLetter) !== -1) {
      cityList[firstLetter].push(item)
    } else {
      cityList[firstLetter] = [item]
      cityIndex.push(firstLetter)
    }
  })

  return {
    cityList,
    cityIndex: cityIndex.sort()
  }
}

export default class CityList extends React.Component {

  state = {

  }

  formatCityData

  async getCityList() {
    // 获取城市列表数据
    const { data: res } = await Axios.get(
      `${baseUrl}/area/city`,
      {
        params: {
          level: 1
        }
      }
    )
    const { cityList, cityIndex } = formatCityData(res.body)
    // 获取热门城市数据
    const { data: hot } = await Axios.get(`${baseUrl}/area/hot`)
    cityList['hot'] = hot.body
    cityIndex.unshift('hot')
    // 添加当前定位城市数据
    const curCity = await getCurrentCity()
    cityList['#'] = curCity
    cityIndex.unshift('#')
    console.log(cityList, cityIndex, curCity)
  }

  componentDidMount() {
    this.getCityList()
  }

  render() {
    return (
      <div className="citylist">
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          城市选择
        </NavBar>
      </div>
    )
  }
}