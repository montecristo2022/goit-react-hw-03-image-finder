import React, { Component } from 'react';
import styles from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string,
    onModalClick: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClick();
    }
  };

  onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClick();
    }
  };

  render() {
    const { largeImage, alt } = this.props;

    return (
      <div className={styles.overlay} onClick={this.onBackDropClick}>
        <div className={styles.modal}>
          <img src={largeImage} alt={alt} />
        </div>
      </div>
    );
  }
}
