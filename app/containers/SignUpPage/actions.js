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
  CHANGE_EMAIL, CHANGE_PASSWORD, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

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
  console.log(errorCode)
  return {
    type: SIGN_UP_ERROR,
    errorCode
  };
}
