/*
 * AppReducer
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
  SIGN_OUT
} from './constants';

import {SIGN_IN_SUCCESS} from '../HomePage/constants'
import {SIGN_UP_SUCCESS} from '../SignUpPage/constants'

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return state
        .set('currentUser', action.response.data)
        .set('isAuthenticated', true)
    case SIGN_UP_SUCCESS:
      return state
        .set('currentUser', action.response.data)
        .set('isAuthenticated', true)
    case SIGN_OUT:
      return initialState
      /*return state
        .set('currentUser', false)
        .set('isAuthenticated', false)*/
    default:
      return state;
  }
}

export default appReducer;
