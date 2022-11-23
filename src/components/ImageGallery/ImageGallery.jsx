import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul>
          {this.props.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            // console.log(oneHit)
            return (
              <li key={id}>
                <ImageGalleryItem
                 url={webformatURL}
                 largeImageURL={largeImageURL}
                 tag={tags}
      
                  openModal={this.props.onOpenModal}
                
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}


