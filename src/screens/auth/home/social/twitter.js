import { NativeModules } from 'react-native'
const { RNTwitterSignIn } = NativeModules
import Config from 'react-native-config'

export default function() {
	RNTwitterSignIn.init(Config.TWITTER_KEY, Config.TWITTER_SECRET)
	//RNTwitterSignIn.logOut()

	return RNTwitterSignIn.logIn()
		.then(({ authToken, authTokenSecret, userID })=>{
			return {
				credentials: {
					access_token: authToken.toString(),
					access_token_secret: authTokenSecret.toString()
				}, 
				userId: userID
			}
		})
}