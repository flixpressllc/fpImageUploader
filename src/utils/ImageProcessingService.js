import { THUMBNAIL_WIDTH, MAX_UPLOAD_WIDTH } from '../settings';
import { dataURLToBlob } from './BinaryDataService';

export function createResizedImageDataUrl (imgElement, resizeTo) {
  var canvas = document.createElement('canvas'),
  max_size = resizeTo,// TODO : pull max size from a site config
  width = imgElement.width,
  height = imgElement.height;

  if (width > height) {
    if (width > max_size) {
      height *= max_size / width;
      width = max_size;
    }
    else if (width < 600) {
      height *= 600 / width;
      width = 600;
    }
  } else {
    if (height > max_size) {
      width *= max_size / height;
      height = max_size;
    }
    else if (height < 600) {
      width *= 600 / height;
      height = 600;
    }
  }

  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(imgElement, 0, 0, width, height);
  var dataUrl = canvas.toDataURL('image/jpeg', 0.6);

  /* Now, we have to create a new image
  */
  return dataUrl;
}

export function processImageFileUpload (asciiString, desiredName)
{ return new Promise(( resolve ) => {
  var image = new Image();
  image.onload = () => {
    resolve(createUserImageSizes(image, desiredName));
  };
  image.src = "data:image/jpeg;base64," + asciiString;
});}

export function createUserImageSizes (image, desiredName) {
  const displayDataUrl = createResizedImageDataUrl(image, THUMBNAIL_WIDTH);
  const uploadDataUrl = createResizedImageDataUrl(image, MAX_UPLOAD_WIDTH);

  // Prepare uploadable data
  let blob = dataURLToBlob(uploadDataUrl);
  blob.lastModifiedDate = new Date();
  blob.name = '' + desiredName;

  return {displayDataUrl, blob};
}
