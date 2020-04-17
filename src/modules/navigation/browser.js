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

export const openNativeURL = async(link)=>{
	if (await Linking.canOpenURL(link))
		return Linking.openURL(link)
		//else alert
}

export const openURL = (props, {browser, link, fromBottom=false, barColor=themed.main(), iconColor=themed.tintColor()})=>{
	const protoRegex = /^(https|http|ftp)/

	//Open in docs preview in android
	if (Platform.OS == 'android' && /\.(pdf|xlsx?|docx?|pptx?)($|\?)/.test(link))
		link = `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(link)}`

	switch(browser || store.getState().local.browser) {
		case 'system':
			openNativeURL(link)
		break

		case 'ios.chrome':
			openNativeURL(link.replace(protoRegex, 'googlechrome'))
		break

		case 'ios.firefox':
			openNativeURL('firefox://open-url?url='+link)
		break

		case 'ios.firefox-focus':
			openNativeURL('firefox-focus://open-url?url='+link)
		break

		case 'ios.opera':
			openNativeURL('opera://open-url?url='+link)
		break

		case 'ios.edge':
			openNativeURL('microsoft-edge-'+link)
		break

		case 'ios.dolphin':
			openNativeURL(link.replace(protoRegex, 'dolphin'))
		break

		case 'ios.brave':
			openNativeURL('brave://open-url?url='+link)
		break

		default:
			if (!protoRegex.test(link))
				return openNativeURL(link)

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