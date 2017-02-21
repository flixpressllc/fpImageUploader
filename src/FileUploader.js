import React, { Component } from 'react';
import './FileUploader.scss';

class FileUploader extends Component {
  handleClick() {
    this.fileUploadElement.click();
  }
  render() {
    return (
      <div className="fpImageUploader-FileUploader">
        <input
          type="file"
          onChange={ this.handleFileChange }
          ref={ el => this.fileUploadElement = el }
          style={{display: 'none'}}
        />
        <input
          type="button"
          value="Upload a File"
          onClick={ this.handleClick.bind(this) }
        />
      </div>
    );
  }
}

export default FileUploader;
