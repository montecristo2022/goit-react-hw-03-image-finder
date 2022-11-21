import React, { Component } from 'react';

export default class PictureFetchInfo extends Component {
  state = {
    picture: null,

    error: null,
    status: 'idle',
  };

  API_KEY = '31403834-67d7794be9df50ce2ee75ea48';

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pictureName !== this.props.pictureName) {
      console.log('не равно');

      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.props.pictureName}&image_type=photo`
        )
          .then(response => {
            console.log(response);
            if (response.ok) {
              return response.json();
            }

            return Promise.reject(new Error('Нет таких картинок!'));
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

  render() {
    const { picture, error, status } = this.state;

    if (status === 'idle') {
      return <div>Введите имя картинки, которую хотите найти</div>;
    }

    if (status === 'pending') {
      return <div>Загружаем...</div>;
    }

    if (status === 'rejected') {
      return (
        <>
          <h2>{error.message}</h2>
          <p>Попробуйте заново!</p>
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <ul>
          <li class="gallery-item">
            <img
              src={picture.hits[0].largeImageURL}
              alt=""
              width="400"
              height="400"
            />
            <p>Загрузки: {picture.hits[0].downloads}</p>
          </li>
        </ul>
      );
    }
  }
}
