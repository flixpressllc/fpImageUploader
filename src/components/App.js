import React, { Component } from 'react';
import ImageUploadButton from './ImageUploadButton';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="fpImageUploader">
        <ImageUploadButton/>
      </div>
    );
  }
}

export default App;
