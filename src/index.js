import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

function ImageSelectionInterfaceCreate (o) {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

window.ImageSelectionInterfaceCreate = ImageSelectionInterfaceCreate;