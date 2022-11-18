import React, { Component } from 'react';

export default class PictureFetchInfo extends Component {
  state = {
    picture: null,
    loading: false,
    error: null,
  };

  API_KEY = '31403834-67d7794be9df50ce2ee75ea48';

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pictureName !== this.props.pictureName) {
      console.log('не равно');

      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.props.pictureName}&image_type=photo`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error('Нет таких картинок!'));
        })
        .then(picture => {
          this.setState({ picture });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({loading: false}));
    }
  }

  render() {
    const { picture, loading } = this.state;

    return (
      <div>
        <div>Наша картинка</div>
        {this.state.error && <h2>yyyyyyyyyyyyyy</h2>}
        {this.state.loading && <div>Загружаем...</div>}
        {!this.state.picture && (
          <div>Введите имя картинки, которую хотите найти</div>
        )}

        {this.state.picture && (
          <ul>
            <li class="gallery-item">
              <img src={this.state.picture.hits[0].largeImageURL} alt="" />
            </li>
          </ul>
        )}
      </div>
    );
  }
}

// .then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error('нет покемона'))
//     .then(picture => {
//       console.log(picture);
//       this.setState({ picture: picture });
//     });
//   })
//   .catch(error => {
//     this.setState({ error: error });
//   })
//   .finally(() => this.setState({ loading: false }));
