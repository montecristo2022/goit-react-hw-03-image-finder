import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {

  render() {

const {openModal, largeImageURL, url, tag} = this.props

    // console.log(this.props);
    // console.log(this.props.oneHit);
    return (
      <img
        onClick={() => {openModal(largeImageURL, tag)}}
        src={url}
        alt={tag}
      />
    );
  }
}







