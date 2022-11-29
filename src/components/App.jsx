import React, { Component } from 'react';
import PictureErrorView from './PictureErrorView/PictureErrorView';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import ButtonLoadMore from 'components/ButtnoLoadMore/ButtonLoadMore';
import { Modal } from 'components/Modal/Modal';

import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    pictureName: '',
    page: 1,
    picture: null,
    error: null,
    status: 'idle',
    largeImage: '',
    showModal: false,
    tags: '',
    photo: [],
    searchTotal: null,
  };

  API_KEY = '31403834-67d7794be9df50ce2ee75ea48';

  componentDidUpdate(prevProps, prevState) {
    const { pictureName, page } = this.state;
    if (prevState.pictureName !== pictureName) {
      this.setState({ photo: [] });
    }

    if (prevState.pictureName !== pictureName || prevState.page !== page) {
      console.log('не равно');
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=${this.API_KEY}&q=${pictureName}&image_type=photo&page=${page}&per_page=12`
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
          this.setState(prevState => ({
            photo: [...prevState.photo, ...picture.hits],
            searchTotal: picture.total,
          }));
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({
      largeImageURL,
      tags,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName: pictureName, page: 1 });
  };

  changePage = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
    console.log(this.state.page);
  };

  render() {
    const {
      error,
      status,
      showModal,
      largeImageURL,
      tags,
      photo,
      searchTotal,
      page,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' ? (
          <div>Введите имя картинки, которую хотите найти!</div>
        ) : (
          ''
        )}

        {status === 'pending' ? <Loader /> : ''}

        {status === 'rejected' ? (
          <PictureErrorView message={error.message} />
        ) : (
          ''
        )}

        <ImageGallery hits={photo} onOpenModal={this.openModal} />
        {searchTotal / page > 12 && (
          <ButtonLoadMore onClick={this.changePage} />
        )}

        {showModal && (
          <Modal
            onModalClick={this.toggleModal}
            largeImage={largeImageURL}
            alt={tags}
          />
        )}
      </>
    );
  }
}
