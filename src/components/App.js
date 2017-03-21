import React, { Component, PropTypes as PT } from 'react';
import StateStore from '../stores/StateStore';
import * as StateActions from '../actions/StateActions';
import UserImageStore from '../stores/UserImageStore';
import UserImageUploadButton from './UserImageUploadButton';
import SearchBar from './SearchBar';
import UserImageContainer from './UserImageContainer';
import ProceedButton from './ProceedButton';
import {MAX_IMAGE_DEFAULT, MIN_IMAGE_DEFAULT} from '../settings';
import './App.scss';

import UploadHandler from '../utils/UploadHandler';

const propTypes = {
  maxImages: PT.number.isRequired,
  minImages: PT.number.isRequired
}

const defaultProps = {
  maxImages: MAX_IMAGE_DEFAULT,
  minImages: MIN_IMAGE_DEFAULT
}

class App extends Component {
  constructor (props) {
    super(props)
    this.checkImageCount = this.checkImageCount.bind(this);
    this.setStateViaStore = this.setStateViaStore.bind(this);

    this.state = StateStore.getState(['isUploading', 'canUpload']);
  }

  setStateViaStore() {
    this.setState(StateStore.getState(['isUploading', 'canUpload']));
  }

  checkImageCount() {
    let count = UserImageStore.getImageCount();
    if (count >= this.props.minImages) {
      StateActions.setState({canUpload: true});
    }
  }

  componentDidMount() {
    StateStore.on('STATE_UPDATED', this.setStateViaStore);
    UserImageStore.on('change', this.checkImageCount)
    this.checkImageCount();
  }

  componentWillUnmout() {
    StateStore.removeListener('STATE_UPDATED', this.setStateViaStore);
    UserImageStore.removeListener('change', this.checkImageCount);
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
        <UserImageUploadButton />
        <UserImageContainer />
        <SearchBar />
        <ProceedButton />
      </div>
    );
  }
}

Object.assign(App, {defaultProps}, {propTypes})

export default App;
