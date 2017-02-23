import React, { Component } from 'react';
import './ImageContainer.scss';

import ImageStore from '../stores/ImageStore';
import { traverseObject } from 'happy-helpers';

class ImageContainer extends Component {
  constructor (props) {
    super(props);
    this.displayImage = this.displayImage.bind(this);

    this.state = {};
  }

  componentDidMount() {
    ImageStore.on('change', this.displayImage);
  }
  componentWillUnmout() {
    ImageStore.removeListener('change', this.displayImage)
  }

  displayImage() {
    const images = ImageStore.getUserImages();
    this.setState({images})
  }

  render() {
    let images = this.state.images || {};
    let imagesArr = [];
    traverseObject(images, (key, val) => {
      imagesArr.push(
        <img src={val.displayDataUrl} key={key}
          onClick={() => console.log(val.blob.name)}
          role="presentation"/>
      )
    })
    return (
      <div className="fpImageUploader-ImageContainer">
        { imagesArr }
      </div>
    );
  }
}

export default ImageContainer;
