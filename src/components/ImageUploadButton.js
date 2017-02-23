import React, { Component } from 'react';
import FileUploader from './lib/FileUploader';
import './ImageUploadButton.scss';

import { registerUserImageFile } from '../actions/ImageActions';

const propTypes = {
  // text: PT.string.isRequired,
  // onChange: PT.func.isRequired
}

class ImageUploadButton extends Component {
  handleChange (e) {
    e.preventDefault();
    this.fileChangeHandler(e);
  }

  onFileLoad (file) {
    registerUserImageFile(file);
  }

  fileChangeHandler (e) {
    let files = e.target.files;
    let numFilesReceived = files.length;
    let _this = this;

    function onFileLoad() {
      // `this` is the file reader
      _this.onFileLoad(this.result);
    }

    for (var i = 0; i < numFilesReceived ; i++) {
      var reader = new FileReader();
      reader.onload = onFileLoad;
      reader.readAsArrayBuffer(files[i]);
    }
  }


  render() {
    return (
      <FileUploader className="fpImageUploader-ImageUploadButton"
        buttonClass="fpImageUploader-ImageUploadButton-button"
        multiple={ true }
        text="Upload Images" onChange={ this.handleChange.bind(this) }/>
    );
  }
}

ImageUploadButton.propTypes = propTypes;

export default ImageUploadButton;
