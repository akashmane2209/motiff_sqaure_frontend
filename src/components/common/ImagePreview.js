import React, { Component } from 'react';

export class ImagePreview extends Component {
  render() {
    const { show_preview, image_url } = this.props;
    return (
      <div>
        {show_preview ? (
          <img src={image_url} width='200' alt='preview' />
        ) : null}
      </div>
    );
  }
}

export default ImagePreview;
