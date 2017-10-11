/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectSignUp = (state) => state.get('signup');

const makeSelectEmail = () => createSelector(
  selectSignUp,
  (signUpState) => signUpState.get('email')
);

const makeSelectError = () => createSelector(
  selectSignUp,
  (signUpState) => signUpState.get('error')
);

const makeSelectSignupParams = () => createSelector(
  selectSignUp,
  (signUpState) => signUpState.get('params')
);


export {
  selectSignUp,
  makeSelectEmail,
  makeSelectError,
  makeSelectSignupParams
};
