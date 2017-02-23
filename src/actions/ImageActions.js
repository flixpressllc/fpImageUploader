import dispatcher from './dispatcher';

export function registerUserImageFile (fileData) {
  dispatcher.dispatch({type: 'REGISTER_USER_IMAGE_FILE', fileData});
}
