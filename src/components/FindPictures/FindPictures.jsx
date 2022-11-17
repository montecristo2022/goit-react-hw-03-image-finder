import React, { Component } from 'react';
import RenderPicture from 'components/RenderPicture/RenderPicture';

export default class FindPictures extends Component {
  state = {
    value: '',
    fetchData: '',
  };

  APIKEY = '31403834-67d7794be9df50ce2ee75ea48';

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  reset = () => {
    this.setState({
      value: '',
    });
  };

  saveData = data => {
    return data;
  };

  fetchPictures = () => {
    fetch(
      `https://pixabay.com/api/?key=${this.APIKEY}&q=${this.state.value}&image_type=photo`
    )
      .then(response => response.json())
      .then(data => {
        this.saveData(data);
      });

    this.reset();
  };

  render() {
    return (
      <>
        <label>
          <input
            type="text"
            placeholder="что вы хотите найти?"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="button" onClick={this.fetchPictures}>
            поиск
          </button>
        </label>
       
      </>
    );
  }
}
