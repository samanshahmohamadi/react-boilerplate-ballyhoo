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


export const RESET_ERROR_LOADING = 'boilerplate/Gallery/RESET_ERROR_LOADING';

export const GET_GALLERY = 'boilerplate/Gallery/GET_GALLERY';
export const GET_GALLERY_SUCCESS = 'boilerplate/Gallery/GET_GALLERY_SUCCESS';
export const GET_GALLERY_ERROR = 'boilerplate/Gallery/GET_GALLERY_ERROR';

export const DOWNLOAD_FILE = 'boilerplate/Gallery/DOWNLOAD_FILE';
export const DOWNLOAD_FILE_SUCCESS = 'boilerplate/Gallery/DOWNLOAD_FILE_SUCCESS';
export const DOWNLOAD_FILE_ERROR = 'boilerplate/Gallery/DOWNLOAD_FILE_ERROR';
