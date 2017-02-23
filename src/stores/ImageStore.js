import { EventEmitter } from 'events';
import dispatcher from '../actions/dispatcher';
import { clone, isNotEmpty } from 'happy-helpers';
import { processImageFileUpload } from '../utils/ImageProcessingService';
import { binaryToAscii, fileToBinary } from '../utils/BinaryDataService';
import { stringToHash } from '../utils/StringUtils';


class ImageStore extends EventEmitter {
  constructor () {
    super();
    this.state = {
      userImages: {},
      stockImages: {}
    }
  }

  getUserImages () {
    return clone(this.state.userImages);
  }

  getImageCount () {
    return Object.keys(this.state.userImages).length;
  }

  preProcessImageFile (file) {
    var asciiString = binaryToAscii(fileToBinary(file));
    var hash = stringToHash(asciiString);

    if (isNotEmpty(this.state.userImages[hash])) return;

    processImageFileUpload(asciiString, hash).then(data => {
      const {displayDataUrl, blob} = data;
      this.registerUserImage(hash, displayDataUrl, blob)
    }).catch(error => { throw error; });
  }

  registerUserImage (hash, displayDataUrl, blob) {
    // Create appropriately sized data urls
    this.state.userImages[hash] = {displayDataUrl, blob};
    this.emit('change', 'newUserImage');
  }

  handleActions(action) {
    switch(action.type) {
      case 'REGISTER_USER_IMAGE_FILE':
        this.preProcessImageFile(action.fileData);
      break;
      default: break;
    }
  }
}

const imageStore = new ImageStore();
dispatcher.register(imageStore.handleActions.bind(imageStore))

export default imageStore;
