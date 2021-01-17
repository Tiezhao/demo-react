//密码正则
export const valid_password_neg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
//邮箱正则
const valid_email_neg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

//判断邮箱是否正确
export function validate_email(value) {
  return valid_email_neg.test(value);
}
