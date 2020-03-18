import { NativeModules } from 'react-native'

export const {
	setDarkTheme,
	saveCookie,
	initCookie,
	isTablet,
	appVersion,
	isExtension,

	openSafari
} = NativeModules.NativeBridge

//Cached value
let _isExtensionCached
export const isExtensionCached = async()=>{
	if (typeof _isExtensionCached == 'undefined')
		_isExtensionCached = await isExtension()

	return _isExtensionCached
}