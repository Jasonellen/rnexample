var t = require('tcomb-form-native')

var MobileRefinement = t.refinement(t.Number, function (n) { return (n.toString().length === 11) })

// if you define a getValidationErrorMessage function, it will be called on validation errors
MobileRefinement.getValidationErrorMessage = function (value, path, context) {
  if (value === null) {
    return '手机号码不能为空'
  } else {
    return '请输入正确的手机号码'
  }
}

export const Mobile = MobileRefinement
