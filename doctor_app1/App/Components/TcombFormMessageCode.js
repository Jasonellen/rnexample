import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/TcombFormMessageCodeStyle'

import Button from 'apsl-react-native-button'

/*
 * 渲染短信验证输入框及短信验证按钮
 * 代码参考：https://github.com/gcanti/tcomb-form-native/blob/master/lib/templates/bootstrap/textbox.js
 */
export default function TcombFormMessageCode (countdown, onRequestChecknum, locals) {
  if (locals.hidden) {
    return null
  }

  var stylesheet = locals.stylesheet
  var formGroupStyle = stylesheet.formGroup.normal
  var textboxStyle = stylesheet.textbox.normal
  var textboxViewStyle = stylesheet.textboxView.normal
  var errorBlockStyle = stylesheet.errorBlock

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error
    textboxStyle = stylesheet.textbox.error
    textboxViewStyle = stylesheet.textboxView.error
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable
    textboxViewStyle = stylesheet.textboxView.notEditable
  }

  var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion='polite' style={errorBlockStyle}>{locals.error}</Text> : null

  return (
    <View style={formGroupStyle}>
      <View style={[textboxViewStyle, styles.checknumTextboxView]}>
        <TextInput style={[textboxStyle, styles.checknumTextbox]}
          maxLength={locals.maxLength}
          onChangeText={(value) => locals.onChange(value)}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          autoFocus={locals.autoFocus}
          value={locals.value}
        />
        <Button
          style={styles.checknumButton}
          textStyle={styles.checknumButtonText}
          isDisabled={countdown > 0}
          onPress={onRequestChecknum}>
          {countdown > 0 ? countdown : '短信验证'}
        </Button>
      </View>
      {error}
    </View>
  )
}
