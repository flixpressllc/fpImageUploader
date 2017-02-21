export function createResizedImageDataUrl (imageRef, resizeTo) {
  var canvas = document.createElement('canvas'),
  max_size = resizeTo,// TODO : pull max size from a site config
  width = imageRef.width,
  height = imageRef.height;

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
  canvas.getContext('2d').drawImage(imageRef, 0, 0, width, height);
  var dataUrl = canvas.toDataURL('image/jpeg', 0.6);

  /* Now, we have to create a new image
  */
  return dataUrl;
}