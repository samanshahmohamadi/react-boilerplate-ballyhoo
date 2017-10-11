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
  SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR, RESET_ERROR_LOADING
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function signUp(params) {
  return {
    type: SIGN_UP,
    params
  };
}

export function singUpSuccess(response) {
  return {
    type: SIGN_UP_SUCCESS,
    response
  };
}

export function singUpError(err) {
  let errorCode
  if (err.response) errorCode = err.response.status
  else if (err.message) errorCode = err.message
  return {
    type: SIGN_UP_ERROR,
    errorCode
  };
}

export function resetErrorAndLoading() {
  return {
    type: RESET_ERROR_LOADING
  };
}
