import React, { Component } from 'react'

export default class ButtonLoadMore extends Component {



  render() {
    return (
      <button type='button' onClick={this.props.onClick}>Загрузить еще картинок...</button>
    )
  }
}
