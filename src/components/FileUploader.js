import React, { Component } from 'react';
import './FileUploader.scss';

class FileUploader extends Component {
  handleClick() {
    this.fileUploadElement.click();
  }

  handleFileChange (e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      console.log(reader.result)
    }

    reader.readAsText(file)
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
