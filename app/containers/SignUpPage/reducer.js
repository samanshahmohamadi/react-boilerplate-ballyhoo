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
  SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR, RESET_ERROR_LOADING
} from './constants';

// The initial state of the App
const initialState = fromJS({
  error: false,
  // password: ''
});

function signUpReducer (state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return state
        .set('loading', true)
        .set('error', false)
        .set('params', action.params)
    case SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('error', action.errorCode);
    case SIGN_UP_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false);
    case RESET_ERROR_LOADING:
      return state
        .set('loading', false)
        .set('error', false);
    default:
      return state;
  }
}

export default signUpReducer;
