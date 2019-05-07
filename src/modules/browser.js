import { Platform, Linking, NativeModules } from 'react-native'
import { store } from 'data'

export const options = Platform.OS=='ios'? [
	{id: 'internal', label: 'Preview'},
	{id: 'system', label: 'Safari'},
	{id: 'ios.chrome', label: 'Chrome'},
	{id: 'ios.firefox', label: 'Firefox'},
	{id: 'ios.firefox-focus', label: 'Firefox Focus'},
	{id: 'ios.opera', label: 'Opera'},
	{id: 'ios.dolphin', label: 'Dolphin'},
	{id: 'ios.brave', label: 'Brave'}
] : [
	{id: 'internal', label: 'Preview'},
	{id: 'system', label: 'System default'}
]

export const getBrowserName = (id)=>{
	for(var i in options)
		if (options[i].id == id)
			return options[i].label

	return ''
}

export const openURL = (props, {link, readerMode=false, fromBottom=false, barColor, iconColor})=>{
	const protoRegex = /^(https|http|ftp)?/

	switch(store.getState().local.browser) {
		case 'system':
			Linking.openURL(link)
		break

		case 'ios.chrome':
			Linking.openURL(link.replace(protoRegex, 'googlechrome'))
		break

		case 'ios.firefox':
			Linking.openURL('firefox://open-url?url='+link)
		break

		case 'ios.firefox-focus':
			Linking.openURL('firefox-focus://open-url?url='+link)
		break

		case 'ios.opera':
			Linking.openURL('opera://open-url?url='+link)
		break

		case 'ios.dolphin':
			Linking.openURL(link.replace(protoRegex, 'dolphin'))
		break

		case 'ios.brave':
			Linking.openURL('brave://open-url?url='+link)
		break

		default:
			switch(Platform.OS){
				case 'ios':{
					console.log(NativeModules.Safari)
					/*NativeModules.Safari.open(props.componentId, {
						reactTag: props.reactTag,

						url: link,
						readerMode: readerMode,
						preferredBarTintColor: barColor,
						preferredControlTintColor: iconColor
					});*/
					/*const SafariView = require('react-native-safari-view')
					SafariView.default.show({
						url: link,
						readerMode: readerMode,
						barTintColor: barColor,
						tintColor: iconColor,
						fromBottom
					})*/
				}break

				case 'android':{
					const {CustomTabs} = require('react-native-custom-tabs')
					CustomTabs.openURL(link, {
						toolbarColor: barColor,
						enableUrlBarHiding: true,
						showPageTitle: true,
						enableDefaultShare: true
					})
				}break
			}
		break
	}
}