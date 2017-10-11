/*
 * SignUpPage Messages
 *
 * This contains all the text for the SignUpPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  startProjectHeader: {
    id: 'boilerplate.containers.SignUpPage.signup_form.header',
    defaultMessage: 'همین حالا ثبت نام کنید!',
  },
  alreadyHaveAccount: {
    id: 'boilerplate.containers.SignUpPage.signup_form.already_signed_up',
    defaultMessage: 'حساب کاربری دارید؟',
  },
  accountInfo: {
    id: 'boilerplate.containers.SignUpPage.signup_form.title_account_info',
    defaultMessage: 'اطلاعات حساب کاربری',
  },
  companyInfo: {
    id: 'boilerplate.containers.SignUpPage.signup_form.title_company_info',
    defaultMessage: 'مشخصات شرکت',
  },
  creativeDirectorInfo: {
    id: 'boilerplate.containers.SignUpPage.signup_form.title_cd_info',
    defaultMessage: 'Creative Director',
  },
  "400": {
    id: 'boilerplate.containers.SignUpPage.error.bad_request',
    defaultMessage: 'اطلاعات وارد شده نامعتبر است.',
  },
  "226": {
    id: 'boilerplate.containers.SignUpPage.error.im_used',
    defaultMessage: 'این آدرس ایمیل قبلا ثبت شده است. اگر رمز عبور خود را فراموش کرده‌اید برای بازیابی آن اقدام کنید.',
  },
});
