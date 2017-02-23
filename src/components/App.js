import React, { Component } from 'react';
import StateStore from '../stores/StateStore';
import ImageUploadButton from './ImageUploadButton';
import ImageContainer from './ImageContainer';
import ProceedButton from './ProceedButton';
import './App.scss';

import UploadHandler from '../utils/UploadHandler';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = StateStore.getState(['isUploading']);

    StateStore.on('STATE_UPDATED', this.setStateViaStore.bind(this));
  }

  setStateViaStore() {
    this.setState(StateStore.getState(['isUploading']));
  }

  componentWillUnmout() {
    StateStore.removeListener('STATE_UPDATED', this.setStateViaStore);
  }

  componentDidUpdate() {
    // Just using this as a convenient hook for taking care of uploading
    if (this.state.isUploading === true) {
      UploadHandler.initUpload();
    }
  }

  render() {
    return (
      <div className="fpImageUploader">
        <ImageUploadButton />
        <ImageContainer />
        <ProceedButton />
      </div>
    );
  }
}

export default App;
