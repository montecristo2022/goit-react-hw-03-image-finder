import React, { Component } from 'react';
import PictureErrorView from 'components/PictureErrorView/PictureErrorView';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import ButtonLoadMore from 'components/ButtnoLoadMore/ButtonLoadMore';
import { Modal } from 'components/Modal/Modal';

export default class PictureFetchInfo extends Component {
  state = {
    picture: null,
    error: null,
    status: 'idle',
    page: 1,
    perPage: 12,
    largeImage: '',
    showModal: false,
    tags: '',
    photo: [],
    searchTotal: null,
  };

  API_KEY = '31403834-67d7794be9df50ce2ee75ea48';

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pictureName !== this.props.pictureName) {
      this.setState({ photo: [] });
    }

    if (
      prevProps.pictureName !== this.props.pictureName ||
      prevProps.page !== this.props.page
    ) {
      console.log('не равно');
      console.log(prevProps.page);
      console.log(this.props.page);
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.props.pictureName}&image_type=photo&page=${this.props.page}&per_page=${this.state.perPage}`
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

  render() {
    const {
      picture,
      error,
      status,
      showModal,
      largeImageURL,
      tags,
      photo,
      searchTotal,
    } = this.state;

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
          <ImageGallery hits={photo} onOpenModal={this.openModal} />
          {/* <ButtonLoadMore onClick={this.changePage} /> */}

          {searchTotal / this.props.page > 12 && (
            <ButtonLoadMore onClick={this.props.onClick} />
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
}
