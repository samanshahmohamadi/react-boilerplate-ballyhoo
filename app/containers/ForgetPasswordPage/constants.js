/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_EMAIL = 'boilerplate/ForgetPassword/CHANGE_EMAIL';

export const FORGET_PASSWORD = 'boilerplate/ForgetPassword/FORGET_PASSWORD';
export const FORGET_PASSWORD_SUCCESS = 'boilerplate/ForgetPassword/FORGET_PASSWORD_SUCCESS';
export const FORGET_PASSWORD_ERROR = 'boilerplate/ForgetPassword/FORGET_PASSWORD_ERROR';


export const CLEAR_MESSAGES = 'boilerplate/ForgetPassword/CLEAR_MESSAGES';

export const CLEAR_LOADING = 'boilerplate/ForgetPassword/CLEAR_LOADING';
