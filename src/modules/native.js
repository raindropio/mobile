import { NativeModules } from 'react-native'

export const {
	saveCookie,
	initCookie,
	isTablet,
	appVersion,
	isExtension,
	topBarHeight
} = NativeModules.NativeBridge