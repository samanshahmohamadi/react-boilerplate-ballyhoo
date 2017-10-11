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

export const CHANGE_EMAIL = 'boilerplate/Home/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'boilerplate/Home/CHANGE_PASSWORD';
export const SIGN_IN = 'boilerplate/Home/SIGN_IN';
export const SIGN_IN_SUCCESS = 'boilerplate/Home/SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'boilerplate/Home/SIGN_IN_ERROR';

export const CREATE_TNX = 'boilerplate/Home/CREATE_TNX';
export const CREATE_TNX_SUCCESS = 'boilerplate/Home/CREATE_TNX_SUCCESS';
export const CREATE_TNX_ERROR = 'boilerplate/Home/CREATE_TNX_ERROR';


export const SELECT_FILE_ERROR = 'boilerplate/Home/SELECT_FILE_ERROR';
export const CLEAR_SELECT_FILE_ERROR = 'boilerplate/Home/CLEAR_SELECT_FILE_ERROR';

export const CLEAR_LOADING = 'boilerplate/Home/CLEAR_LOADING';
