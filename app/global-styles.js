import {injectGlobal} from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  
  html,
  body {
    direction: rtl;
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'IRANSans','Open Sans', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'IRANSans', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
    text-align: left;
  }
  
  .ui.button {
    font-family: IranSans, 'Open Sans', sans-serif!important;
  }
  
  .text-right {
    text-align: right;
  }
  
  .iranSans {
    font-family: IranSans, 'Open Sans', sans-serif!important;
  }
  
  h1,h2,h3,h4,h5,h6 {
      font-family: IranSans, 'Open Sans', sans-serif!important;
      font-weight: 900!important;
  }
  
  label {
    text-align: right;
  }
  
  .ui.card > .content > * {
        font-family: IranSans, 'Open Sans', sans-serif;
  }
  
  .faNo {
        font-family: IRANSansFaNo, 'Open Sans', sans-serif!important;
  }
  
  .header {
        font-family: IranSans, 'Open Sans', sans-serif!important;
  }
  
  .message > * {
    text-align: right;
  }
  
  .ui.button {
    margin-right: 0px!important;
  }
  
  input {
      font-family: IranSans, 'Open Sans', sans-serif!important;
  }
`;
