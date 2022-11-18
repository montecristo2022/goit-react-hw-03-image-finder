import React, { Component } from 'react'
import PictureFetchInfo from './PictureFetchInfo/PictureFetchInfo';

import Searchbar from './Searchbar/Searchbar'

export default class App extends Component {

  state = {
    pictureName: '',
  };

handleFormSubmit = (pictureName) => {
this.setState({pictureName: pictureName})
}

  render() {
    return (
      <>
      <Searchbar onSubmit={this.handleFormSubmit}/>
       {/* выше рандомное название пропа. Я не вешаю на этот компонент метод */}
     <PictureFetchInfo pictureName={this.state.pictureName}/>
      </>
    )
  }
}
