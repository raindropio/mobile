import { Platform, Linking, NativeModules, processColor } from 'react-native'
import { store } from 'data'
import browsersList from 'assets/browsers'
import { themed } from 'co/style/colors'

export const getBrowserName = (id)=>{
	for(var i in browsersList)
		if (browsersList[i].id == id)
			return browsersList[i].label

	return ''
}

export const openURL = (props, {browser, link, fromBottom=false, barColor=themed.main(), iconColor=themed.tintColor()})=>{
	const protoRegex = /^(https|http|ftp)?/

	switch(browser || store.getState().local.browser) {
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
					NativeModules.SafariBridge.open(props.componentId, {
						reactTag: props.reactTag || -1,

						url: link,
						preferredBarTintColor: processColor(barColor),
						preferredControlTintColor: processColor(iconColor)
					})
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