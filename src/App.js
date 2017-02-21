import React, { Component } from 'react';
import FileUploader from './FileUploader';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="fpImageUploader">
        <FileUploader/>
      </div>
    );
  }
}

export default App;
