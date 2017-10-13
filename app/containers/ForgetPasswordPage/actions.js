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
  CHANGE_EMAIL,
  FORGET_PASSWORD,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_SUCCESS,
  CLEAR_MESSAGES,
  CLEAR_LOADING
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {email} email The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email
  };
}

export function forgetPassword() {
  return {
    type: FORGET_PASSWORD,
  };
}

export function forgetPasswordSuccess(response) {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    response
  };
}

export function forgetPasswordError(err) {
  return {
    type: FORGET_PASSWORD_ERROR,
    err
  };
}

export function clearMessages() {
  return {
    type: CLEAR_MESSAGES
  };
}

export function clearLoading() {
  return {
    type: CLEAR_LOADING
  };
}


