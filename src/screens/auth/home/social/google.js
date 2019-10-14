import {GoogleSignin} from '@react-native-community/google-signin'
import Config from 'react-native-config'

export default function() {
	return GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true, autoResolve: true })
		.then(() => GoogleSignin.configure({
			iosClientId: `${Config.GOOGLE_CLIENT_ID_IOS}.apps.googleusercontent.com`,
			webClientId: `${Config.GOOGLE_CLIENT_ID_ANDROID}.apps.googleusercontent.com`,
			offlineAccess: true,
			forceConsentPrompt: true
		}))
		.then(() => GoogleSignin.getCurrentUser())
		.then(() => GoogleSignin.signOut())
		.then(() => GoogleSignin.signIn())
		.then(() => GoogleSignin.getTokens())
		.then((user) => ({
			credentials: {
				accessToken: user.accessToken.toString()
			}
		}))
		.catch((e)=>{
			console.log(e)
		})
}