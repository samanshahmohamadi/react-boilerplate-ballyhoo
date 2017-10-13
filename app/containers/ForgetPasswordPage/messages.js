/*
 * ForgetPasswordPage Messages
 *
 * This contains all the text for the ForgetPasswordPage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  startProjectHeader: {
    id: 'boilerplate.containers.ForgetPasswordPage.forget_password_form.header',
    defaultMessage: 'فراموشی رمز عبور',
  },
  notSignedUpYetHeader: {
    id: 'boilerplate.containers.ForgetPasswordPage.login_form.not_signed_up',
    defaultMessage: 'حساب کاربری ندارید؟',
  },
  startProjectMessage: {
    id: 'boilerplate.containers.ForgetPasswordPage.start_project.message',
    defaultMessage: 'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',
  },

  404: {
    id: 'boilerplate.containers.ForgetPasswordPage.error.404',
    defaultMessage: 'حساب کاربری با ایمیل وارد شده یافت نشد. لطفا آدرس ایمیل را بررسی و مجددا تلاش کنید.',
  },

  200: {
    id: 'boilerplate.containers.ForgetPasswordPage.success.200',
    defaultMessage: 'درخواست فراموشی رمز عبور با موفقیت ثبت شد. به زودی یک ایمیل حاوی لینک بازیابی رمز عبور در سایت UM برای شما ارسال می‌شود. پس از بازیابی رمز در سایت UM، می‌توانید از رمز جدید خود برای ورود به این حساب کاربری استفاده کنید.',
  },
});
