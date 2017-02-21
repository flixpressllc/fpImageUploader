import React, { Component } from 'react';
import FileUploader from './lib/FileUploader';
import './ImageUploadButton.scss';

import { binaryToAscii, fileToBinary } from '../utils/BinaryDataService';
import { stringToHash } from '../utils/StringUtils';

const propTypes = {
  // text: PT.string.isRequired,
  // onChange: PT.func.isRequired
}

class ImageUploadButton extends Component {
  handleChange (e) {
    e.preventDefault();
    this.fileChangeHandler(e);
  }

  registerUserImage(image, nameForImage) {
    console.log(image, nameForImage);

    // // Create appropriately sized data urls
    // var smallDataUrl = ImageProcessingService.createResizedImageDataUrl(image, 150);
    // var largeDataUrl;
    // largeDataUrl = ImageProcessingService.createResizedImageDataUrl(image, 1200);
    //
    // // Prepare display image
    // var displayImage = new Image();
    // displayImage.name = nameForImage;
    // displayImage.src = smallDataUrl;
    //
    // // Prepare uploadable data
    // var blob = BinaryDataService.dataURLToBlob(largeDataUrl);
    // blob.lastModifiedDate = new Date();
    // blob.name = '' + nameForImage;
    //
    // // Disperse data
    // buildSelectedUserImageUI(displayImage, blob);
    // checkPageState();
  }

  onFileLoad (file) {
    var binary = fileToBinary(file);
    var asciiString = binaryToAscii(binary);
    var hash = stringToHash(asciiString);

    // if (!isRegisteredUserImage(hash)) {
    if (true) {

      var image = new Image();
      image.onload = () => this.registerUserImage(image,hash);
      image.src = "data:image/jpeg;base64," + asciiString;

    }
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
