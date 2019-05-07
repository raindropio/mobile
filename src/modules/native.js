import { NativeModules } from 'react-native'

export const {
	saveCookie,
	initCookie,
	isTablet,
	appVersion,
	isExtension,
	topBarHeight
} = NativeModules.NativeBridge

//Cached value
let _isExtensionCached
export const isExtensionCached = async()=>{
	if (typeof _isExtensionCached == 'undefined')
		_isExtensionCached = await isExtension()

	return _isExtensionCached
}