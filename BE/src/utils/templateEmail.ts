import { ISendMailOptions } from '@nestjs-modules/mailer';
import { CLIENT_SITE_DOMAIN } from './const';

export function NewVerificationEmailOption(
  to: string,
  name: string,
  code: string,
): ISendMailOptions {
  return {
    to: to,
    subject: 'HShopp - Verification via Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #333;">Welcome to HShopp, ${name}!</h1>
          <p style="font-size: 18px;">To verify your account, please use the following OTP:</p>
          <h2 style="font-size: 36px; color: #007bff;">${code}</h2>
          <p style="font-size: 16px;">Please click <a href="${CLIENT_SITE_DOMAIN}/verification">here</a> to enter your code!</p>
          <p style="font-size: 16px; color: red;">Code will expire in 1 minute!</p>
          <p style="font-size: 16px;">Thank you for using HShopp!</p>
        </div>
      </div>
    `,
  };
}

export function NewThankyouForRegisterEmailOption(
  to: string,
  name: string,
): ISendMailOptions {
  return {
    to: to,
    subject: 'HShopp - Thank you for your registration!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #333;">Thank you for registering, ${name}!</h1>
          <p style="font-size: 16px;">Please click <a href="${CLIENT_SITE_DOMAIN}/verification">here</a> if you have not yet verified your account!</p>
        </div>
      </div>
    `,
  };
}

export function NewRefreshPasswordEmailOption(
  to: string,
  name: string,
  userId: string,
  token: number,
): ISendMailOptions {
  return {
    to: to,
    subject: 'HShopp - Refresh password!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #333;">We recently sent a request to refresh your password, ${name}!</h1>
          <p style="font-size: 16px;">Please click <a href="${CLIENT_SITE_DOMAIN}/refresh-password?id=${userId}&token=${token}" style="color: #007bff; text-decoration: none;">here</a> to reset your password.</p>
          <p style="font-size: 16px; color: red;">This link will expire in 30 minutes.</p>
        </div>
      </div>
    `,
  };
}

export function NewNotificationDetectChangePasswordEmailOption(
  to: string,
  name: string,
  userId: string,
  token: number,
): ISendMailOptions {
  return {
    to: to,
    subject: 'HShopp - Detected password changed!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #333;">We have detected a password change on your account, ${name}!</h1>
          <h2 style="color: #333;">If this wasn't you, please click the button below to reset your password.</h2>
          <a href="${CLIENT_SITE_DOMAIN}/refresh-password?id=${userId}&token=${token}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
          <p style="font-size: 16px; color: red;">This link will expire in 30 minutes.</p>
        </div>
      </div>
    `,
  };
}

export function ThankYouForOrderMail(
  to: string,
  name: string,
  orderId: string,
): ISendMailOptions {
  return {
    to: to,
    subject: 'HShopp - Thank you for your order!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #333;">Hello, ${name}!</h1>
          <h2 style="color: #333;">Thank you for your order with HShopp!</h2>
          <p style="font-size: 16px; color: #333;">Your order (${orderId}) has been successfully placed.</p>
          <p style="font-size: 16px; color: #333;">We will process your order shortly.</p>
          <p style="font-size: 16px; color: #333;">If you have any questions or concerns, feel free to <a href="${CLIENT_SITE_DOMAIN}/contact">contact us</a>.</p>
          <p style="font-size: 16px; color: #333;">To view order detail, Click <a href="${CLIENT_SITE_DOMAIN}/order/${orderId}">here</a>.</p>
          <p style="font-size: 16px; color: #333;">Thank you for choosing HShopp!</p>
        </div>
      </div>
    `,
  };
}
