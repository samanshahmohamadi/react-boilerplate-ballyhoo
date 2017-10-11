/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  startProjectHeader: {
    id: 'boilerplate.containers.HomePage.login_form.header',
    defaultMessage: 'وارد شوید!',
  },
  notSignedUpYetHeader: {
    id: 'boilerplate.containers.HomePage.login_form.not_signed_up',
    defaultMessage: 'حساب کاربری ندارید؟',
  },
  startProjectMessage: {
    id: 'boilerplate.containers.HomePage.start_project.message',
    defaultMessage: 'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',
  },
  trymeHeader: {
    id: 'boilerplate.containers.HomePage.tryme.header',
    defaultMessage: 'Try me!',
  },
  trymeMessage: {
    id: 'boilerplate.containers.HomePage.tryme.message',
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: 'boilerplate.containers.HomePage.tryme.atPrefix',
    defaultMessage: '@',
  },

  "401": {
    id: 'boilerplate.containers.HomePage.error.401',
    defaultMessage: 'دسترسی غیرمجاز! لطفا با استفاده از نام کاربری و رمز عبور وارد شوید.',
  },

  "208": {
    id: 'boilerplate.containers.HomePage.error.208',
    defaultMessage: 'فایل انتخاب شده قبلا ثبت شده است. امکان ثبت مجدد این فایل وجود ندارد.',
  },

  "enough.pdf": {
    id: 'boilerplate.containers.HomePage.error.enough.pdf',
    defaultMessage: 'تعداد فایل‌های PDF انتخاب شده بیشتر از میزان مجاز است.',
  },

  "enough.movie": {
    id: 'boilerplate.containers.HomePage.error.enough.movie',
    defaultMessage: 'تعداد فایل‌های ویدئوی انتخاب شده بیشتر از میزان مجاز است.',
  },

  "require.video_pdf": {
    id: 'boilerplate.containers.HomePage.error.require.video_pdf',
    defaultMessage: 'لطفا فایل با فرمت mp4 یا PDF انتخاب کنید.',
  },

  "require.pdf": {
    id: 'boilerplate.containers.HomePage.error.require.pdf',
    defaultMessage: 'لطفا فایل با فرمت PDF انتخاب کنید.',
  },

  "require.pdf_jpg": {
    id: 'boilerplate.containers.HomePage.error.require.pdf_jpg',
    defaultMessage: 'لطفا فایل با فرمت PDF یا JPG یا JPEG انتخاب کنید.',
  },

  "require.video": {
    id: 'boilerplate.containers.HomePage.error.require.video',
    defaultMessage: 'لطفا فایل با فرمت mp4 انتخاب کنید.',
  },

  "wrong.field" : {
    id: 'boilerplate.containers.HomePage.error.wrong.field',
    defaultMessage: 'فرمت فایل با ورودی انتخاب شده سازگار نیست.',
  },

  "size_limit.5" : {
    id: 'boilerplate.containers.HomePage.error.size_limit.5',
    defaultMessage: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد.',
  },

  "size_limit.20" : {
    id: 'boilerplate.containers.HomePage.error.size_limit.20',
    defaultMessage: 'حجم فایل نباید بیشتر از ۲۰ مگابایت باشد.',
  },

  "200": {
    id: 'boilerplate.containers.HomePage.success.200',
    defaultMessage: 'ثبت تراکنش با موفقیت انجام شد.',
  },
});
