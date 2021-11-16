import { httpGet } from '../network'

// 封装获取当前定位城市的函数
export const getCurrentCity = () => {
  const curCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if (!curCity) {
    const curCity = new window.BMap.LocalCity()
    return new Promise((resolve, reject) => {
      curCity.get(async res => {
        try {
          const { data } = await httpGet(
            '/area/info',
            {
              name: res.name
            }
          )
          localStorage.setItem('hkzf_city', JSON.stringify(data.body))
          resolve(data.body)
        } catch (error) {
          reject(error)
        }
      })
    })
  } else {
    return Promise.resolve(curCity)
  }
}