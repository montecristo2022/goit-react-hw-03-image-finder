import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.pictureName === '') {
      alert('и как я узнаю что ты хочешь найти?');
      return;
    }

    this.props.onSubmit(this.state.pictureName);

    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header class="searchbar">
        <form class="form" onSubmit={this.handleSubmit}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="что хотите найти?"
            value={this.state.pictureName}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

// APIKEY = '31403834-67d7794be9df50ce2ee75ea48';
// `https://pixabay.com/api/?key=${this.APIKEY}&q=${this.state.value}&image_type=photo`
