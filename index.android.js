import {UIManager} from 'react-native'
import './src'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

//Fix warnings
console.ignoredYellowBox = [
	'Warning: Failed prop type: Invalid prop `source` of type `number`',
	'Warning: Failed prop type: Invalid prop `color` supplied to `Text`'
]