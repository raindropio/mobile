import { NativeModules } from 'react-native'

export const {
	isTablet,
	appVersion,
	openFileUrl
} = NativeModules.NativeBridge