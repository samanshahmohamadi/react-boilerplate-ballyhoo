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
  CLEAR_LOADING,
  CLEAR_MESSAGES,
  FORGET_PASSWORD,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_SUCCESS,
} from './constants';


// The initial state of the App
const initialState = fromJS({
  loading: false,
  email: '',
  error: false
});

function forgetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state
        .set('email', action.email);
    case CLEAR_MESSAGES:
      return state
        .set('error', false)
        .set('success', false);
    case FORGET_PASSWORD:
      return state
        .set('loading', true)
        .set('error', false)
    case FORGET_PASSWORD_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('success', action.response.status)
        .set('email', '');
    case FORGET_PASSWORD_ERROR:
      return state
        .set('loading', false)
        .set('error', action.err)
        .set('success', false)
        .set('email', '');
    case CLEAR_LOADING:
      return state
        .set('loading', false)
    default:
      return state;
  }
}

export default forgetPasswordReducer;
