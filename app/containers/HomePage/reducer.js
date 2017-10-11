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
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  CREATE_TNX,
  CREATE_TNX_SUCCESS,
  CREATE_TNX_ERROR,
  SELECT_FILE_ERROR,
  CLEAR_SELECT_FILE_ERROR,
  CLEAR_LOADING
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  email: '',
  password: ''
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state
        .set('email', action.email);
    case CHANGE_PASSWORD:
      return state
        .set('password', action.password)
        .set('currentUser', false);
    case SIGN_IN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('currentUser', false);
    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('currentUser', action.response.data);
    case SIGN_IN_ERROR:
      return state
        .set('loading', false)
        .set('error', action.err)
    case CREATE_TNX:
      return state
        .set('loading', true)
        .set('error', false)
    // .set('createTnxParams', action.params)
    case CREATE_TNX_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('success', 200)
        .set('tnx', action.response)
    case CREATE_TNX_ERROR:
      return state
        .set('loading', false)
        .set('error', action.err)
    case SELECT_FILE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.err)
    case CLEAR_SELECT_FILE_ERROR:
      return state
        .set('error', false)
        .set('success', false)
    case CLEAR_LOADING:
      return state
        .set('loading', false)
    default:
      return state;
  }
}

export default homeReducer;
