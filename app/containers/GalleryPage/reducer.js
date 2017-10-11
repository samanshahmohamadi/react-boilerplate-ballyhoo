/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {fromJS} from 'immutable';

import {
  RESET_ERROR_LOADING, GET_GALLERY, GET_GALLERY_ERROR, GET_GALLERY_SUCCESS, DOWNLOAD_FILE, DOWNLOAD_FILE_SUCCESS, DOWNLOAD_FILE_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  error: false,
  loading: false,
  gallery: {}
  // password: ''
});

function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_ERROR_LOADING:
      return state
        .set('loading', false)
        .set('error', false);
    case GET_GALLERY:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_GALLERY_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('galleries', action.response.data)
    case GET_GALLERY_ERROR:
      return state
        .set('loading', false)
        .set('error', action.err)
    case DOWNLOAD_FILE:
      return state
        .set('loading', action.mediaId)
        .set('mediaId', action.mediaId)
    case DOWNLOAD_FILE_SUCCESS:
      return state
        .set('loading', false)
    case DOWNLOAD_FILE_ERROR:
      return state
        .set('loading', false)
    default:
      return state;
  }
}

export default galleryReducer;
