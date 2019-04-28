import './src'
import KeyboardManager from 'react-native-keyboard-manager'

KeyboardManager.setEnableDebugging(false)
KeyboardManager.setEnable(true)
KeyboardManager.setEnableAutoToolbar(false)
KeyboardManager.setToolbarPreviousNextButtonEnable(true)
KeyboardManager.setShouldShowTextFieldPlaceholder(false)
KeyboardManager.setShouldToolbarUsesTextFieldTintColor(true)

console.ignoredYellowBox = [
	'Warning: Failed prop type: Invalid prop `source` of type `number`',
	'Warning: Overriding previous layout animation with new one before the first began:',
]