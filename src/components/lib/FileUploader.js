import React, { Component, PropTypes as PT } from 'react';
import './FileUploader.scss';

const propTypes = {
  text: PT.string.isRequired,
  onChange: PT.func.isRequired,
  buttonClass: PT.string,
  className: PT.string,
  multiple: PT.bool
}

const defaultProps = {
  buttonClass: '',
  className: '',
  multiple: false
}

class FileUploader extends Component {
  handleClick() {
    this.fileUploadElement.click();
  }

  render() {
    return (
      <div className={ this.props.className }>
        <input
          type="file"
          onChange={ this.props.onChange }
          ref={ el => this.fileUploadElement = el }
          style={{display: 'none'}}
          multiple={ this.props.multiple }
        />
        <input
          type="button"
          className={ this.props.buttonClass }
          value={ this.props.text }
          onClick={ this.handleClick.bind(this) }
        />
      </div>
    );
  }
}

Object.assign(FileUploader, propTypes, defaultProps)

export default FileUploader;
