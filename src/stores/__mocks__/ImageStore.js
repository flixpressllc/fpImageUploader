const imageStoreInstance = require.requireActual('../ImageStore').default;

imageStoreInstance.__setNumImages = function (num) {
  this.numImagesOverride = num;
  this.emit('change');
}

imageStoreInstance._oldGetImageCount = imageStoreInstance.getImageCount.bind(imageStoreInstance);

imageStoreInstance.getImageCount = function () {
  if (this.numImagesOverride === false) {
    return this._oldGetImageCount();
  }
  return this.numImagesOverride;
}

imageStoreInstance.__reset = function () {
  this.numImagesOverride = false;
}

imageStoreInstance.__reset();

export default imageStoreInstance;