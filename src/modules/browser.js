import { Platform, Linking, processColor } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { store } from 'data'
import browsersList from 'assets/browsers'

async function openNativeURL(link) {
	if (await Linking.canOpenURL(link))
		return Linking.openURL(link)
		//else alert
}

export const getBrowserName = (id)=>{
	for(var i in browsersList)
		if (browsersList[i].id == id)
			return browsersList[i].label

	return ''
}

export const openURL = ({ browser, link, fromBottom=false, barColor='', iconColor='' })=>{
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

		case 'ios.opera-touch':
			openNativeURL('touch-'+link)
		break

		default:
			if (!protoRegex.test(link))
				return openNativeURL(link)

			InAppBrowser.open(link, {
				//android
				toolbarColor: barColor,
				enableUrlBarHiding: true,
				showTitle: true,
				enableDefaultShare: true,
				hasBackButton: true,

				//ios
				modalEnabled: fromBottom,
				animated: true,
				preferredBarTintColor: processColor(barColor),
				preferredControlTintColor: processColor(iconColor),
			})
		break
	}
}