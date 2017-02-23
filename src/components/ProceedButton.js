import React, { Component } from 'react';
import './ProceedButton.scss';

import StateStore from '../stores/StateStore';
import * as StateActions from '../actions/StateActions';

const STATE_KEYS_FROM_STORE = ['isUploading', 'canUpload']

class ProceedButton extends Component {
  constructor (props) {
    super(props);
    StateStore.on('STATE_UPDATED', this.setStateViaStore.bind(this));
    this.state = StateStore.getState(STATE_KEYS_FROM_STORE);

    this.uploadIsDenied = this.uploadIsDenied.bind(this);
  }

  componentWillUnmout() {
    StateStore.removeListener('STATE_UPDATED', this.setStateViaStore)
  }

  setStateViaStore() {
    this.setState(StateStore.getState(STATE_KEYS_FROM_STORE));
  }

  initUpload() {
    StateActions.initUpload();
  }

  uploadIsDenied() {
    return this.state.isUploading || !this.state.canUpload
  }

  render() {
    const disabled = this.uploadIsDenied();
    const buttonText = this.state.isUploading ? 'Uploading' : 'Proceed'
    return (
      <button
        className="fpImageUploader-ProceedButton"
        type="button"
        onClick={ this.initUpload }
        disabled={ disabled }>
        { buttonText }
      </button>
    );
  }
}

export default ProceedButton;
