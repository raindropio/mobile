import { NativeModules } from 'react-native'

export const {
	isTablet,
	appVersion,
	isExtension,
} = NativeModules.NativeBridge