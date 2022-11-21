import React, { Component } from 'react';
import PictureErrorView from 'components/PictureErrorView/PictureErrorView';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'Loader/Loader';
import ButtonLoadMore from 'components/ButtnoLoadMore/ButtonLoadMore';

export default class PictureFetchInfo extends Component {
  state = {
    picture: null,
    error: null,
    status: 'idle',
    page: 1,
    perPage: 12,
  };

  API_KEY = '31403834-67d7794be9df50ce2ee75ea48';

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pictureName !== this.props.pictureName) {
      console.log('не равно');

      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.props.pictureName}&image_type=photo&page=${this.state.page}&per_page=${this.state.perPage}`
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            if (data.total > 0) {
              return data;
            }
            return Promise.reject(
              new Error(`нет картинок по запросу ${this.props.pictureName}`)
            );
          })
          .then(picture => {
            console.log(picture);
            this.setState({ picture, status: 'resolved' });
          })
          .catch(error => {
            this.setState({ error, status: 'rejected' });
          });
      }, 1000);
    }
  }

  changePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
    console.log(this.state.page);
  };

  render() {
    const { picture, error, status, page, perPage } = this.state;

    if (status === 'idle') {
      return <div>Введите имя картинки, которую хотите найти</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <PictureErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery hits={picture.hits} />
          <ButtonLoadMore  onClick={this.changePage}/>

        </>
      );
    }
  }
}
