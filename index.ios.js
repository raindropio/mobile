import './src'
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
	'Non-serializable values were found in the navigation state',
	'POP_TO_TOP',
	'ReactNativeFiberHostComponent'
])