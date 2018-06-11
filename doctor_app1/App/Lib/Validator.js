var t = require('tcomb-form-native')

import Regexp from '../Services/Regexp'

var MobileRefinement = t.refinement(t.Number, function (n) {
  return Regexp.isPhone(n)
})

// if you define a getValidationErrorMessage function, it will be called on validation errors
MobileRefinement.getValidationErrorMessage = function (value, path, context) {
  if (value === null) {
    return '手机号码不能为空'
  } else {
    return '请输入正确的手机号码'
  }
}

export const Mobile = MobileRefinement

var PasswordRefinement = t.refinement(t.Number, function (n) {
  return Regexp.isPassword(n)
})

// if you define a getValidationErrorMessage function, it will be called on validation errors
PasswordRefinement.getValidationErrorMessage = function (value, path, context) {
  if (value === null) {
    return '密码不能为空'
  } else {
    return '密码最少6位最多输入16位'
  }
}

export const Password = PasswordRefinement
