import React from 'react';
import { Carousel } from 'antd-mobile';
import Axios from 'axios';

const baseUrl = 'http://localhost:8080'

export default class Index extends React.Component {
  state = {
    data: [],
    imgHeight: 212,
  }

  getImgList = async () => {
    const { data: res } = await Axios.get(`${baseUrl}/home/swiper`)
    this.setState({
      data: res.body
    })
  }

  componentDidMount() {
    this.getImgList()
  }


  render() {
    return (
      <Carousel
        autoplay
        infinite
      >
        {this.state.data.map(item => (
          <a
            key={item.id}
            href="#"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`${baseUrl}${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  }
}