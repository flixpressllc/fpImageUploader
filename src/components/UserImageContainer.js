import React, { Component } from 'react';
import './UserImageContainer.scss';

import SelectableMedia from './SelectableMedia';
import UserImageStore from '../stores/UserImageStore';
import { traverseObject } from 'happy-helpers';

class UserImageContainer extends Component {
  constructor (props) {
    super(props);
    this.displayImage = this.displayImage.bind(this);

    this.state = {};
  }

  componentDidMount() {
    UserImageStore.on('change', this.displayImage);
  }
  componentWillUnmout() {
    UserImageStore.removeListener('change', this.displayImage)
  }

  displayImage() {
    const images = UserImageStore.getUserImages();
    this.setState({images})
  }

  render() {
    let images = this.state.images || {};
    let imagesArr = [];
    traverseObject(images, (key, val) => {
      imagesArr.push(
        <SelectableMedia key={key} disabled={false} onSelect={()=> {}}>
          <img src={val.displayDataUrl}
            onClick={() => console.log(val.blob.name)}
            role="presentation"/>
        </SelectableMedia>
      )
    })
    return (
      <div className="fpImageUploader-UserImageContainer">
        { imagesArr }
      </div>
    );
  }
}

export default UserImageContainer;
