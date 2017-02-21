import React, { Component, PropTypes as PT } from 'react';
import './FileUploader.scss';

const propTypes = {
  text: PT.string.isRequired,
  onChange: PT.func.isRequired
}

class FileUploader extends Component {
  handleClick() {
    this.fileUploadElement.click();
  }

  render() {
    let className = this.props.className || '';
    return (
      <div className={ className }>
        <input
          type="file"
          onChange={ this.props.onChange }
          ref={ el => this.fileUploadElement = el }
          style={{display: 'none'}}
        />
        <input
          type="button"
          value={ this.props.text }
          onClick={ this.handleClick.bind(this) }
        />
      </div>
    );
  }
}

FileUploader.propTypes = propTypes;

export default FileUploader;
