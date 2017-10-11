/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  GET_GALLERY, GET_GALLERY_SUCCESS, GET_GALLERY_ERROR, RESET_ERROR_LOADING, DOWNLOAD_FILE, DOWNLOAD_FILE_SUCCESS, DOWNLOAD_FILE_ERROR
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function getGallery() {
  return {
    type: GET_GALLERY
  };
}

export function getGalleryError() {
  return {
    type: GET_GALLERY_ERROR
  };
}

export function getGallerySuccess(response) {
  return {
    type: GET_GALLERY_SUCCESS,
    response
  };
}

export function resetErrorAndLoading() {
  return {
    type: RESET_ERROR_LOADING
  };
}

export function downloadFile(mediaId) {
  return {
    type: DOWNLOAD_FILE,
    mediaId
  };
}

export function downloadFileError(err) {
  return {
    type: DOWNLOAD_FILE_ERROR,
    err
  };
}

export function downloadFileSuccess(response) {
  return {
    type: DOWNLOAD_FILE_SUCCESS,
    response
  };
}
