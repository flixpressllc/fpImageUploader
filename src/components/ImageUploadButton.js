import React, { Component, PropTypes as PT } from 'react';
import FileUploader from './lib/FileUploader';

const propTypes = {
  // text: PT.string.isRequired,
  // onChange: PT.func.isRequired
}

class ImageUploadButton extends Component {
  handleChange (e) {
    e.preventDefault();
    console.log('in it')
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      // do something with reader.result
      console.log(reader.result);
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className="fpImageUploader-ImageUploadButton">
        <FileUploader text="Upload Images" onChange={ this.handleChange }/>
      </div>
    );
  }
}

ImageUploadButton.propTypes = propTypes;

export default ImageUploadButton;
