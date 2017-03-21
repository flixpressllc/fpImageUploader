import React, { Component, PropTypes as PT } from 'react';
import './SelectableMedia.scss';

const propTypes = {
  onSelect: PT.func.isRequired,
  disabled: PT.bool
};

const defaultProps = {
  disabled: false
};

class SelectableMedia extends Component {
  render() {
    return (
      <div className="fpImageUploader-SelectableMedia">
        <div className="fpImageUploader-SelectableMedia-mediaItem">
          {this.props.children}
        </div>
        <button
          className="fpImageUploader-SelectableMedia-select"
          disabled={this.props.disabled}
          type="button" onClick={this.props.onSelect}>
          Select
        </button>
      </div>
    );
  }
}

SelectableMedia.propTypes = propTypes;
SelectableMedia.defaultProps = defaultProps;

export default SelectableMedia;
