import React, { Component } from 'react';
import PictureFetchInfo from './PictureFetchInfo/PictureFetchInfo';

import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    pictureName: '',
    page: 1,
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName: pictureName, page: 1 });
  };

  changePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
    console.log(this.state.page);
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* выше рандомное название пропа. Я не вешаю на этот компонент метод */}
        <PictureFetchInfo
          pictureName={this.state.pictureName}
          onClick={this.changePage}
          page={this.state.page}
        />
      </>
    );
  }
}
