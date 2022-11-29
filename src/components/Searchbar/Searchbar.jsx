import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
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
      <header className={styles.header}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button className={styles.button} type="submit">
            Поиск
          </button>

          <input
            className={styles.input}
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


