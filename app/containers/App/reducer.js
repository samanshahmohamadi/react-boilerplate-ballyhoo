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
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SIGN_OUT
} from './constants';

import {SIGN_IN_SUCCESS} from '../HomePage/constants'
import {SIGN_UP_SUCCESS} from '../SignUpPage/constants'
import {REHYDRATE} from 'redux-persist/constants'

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false
  }
});

function appReducer(state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
    // .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SIGN_IN_SUCCESS:
      return state
        .set('currentUser', action.response.data)
        .set('isAuthenticated', true)
    case SIGN_UP_SUCCESS:
      return state
        .set('currentUser', action.response.data)
        .set('isAuthenticated', true)
    case SIGN_OUT:
      return state
        .set('currentUser', false)
        .set('isAuthenticated', false)
    case "persist/REHYDRATE":
      return state
        .set('error', false)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
