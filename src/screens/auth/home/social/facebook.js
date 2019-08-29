import {LoginManager, AccessToken} from 'react-native-fbsdk'

export default function() {
	return LoginManager.logInWithPermissions(['email'])
		.then(() => AccessToken.getCurrentAccessToken())
		.then((data) => ({
			credentials: {
				accessToken: data.accessToken.toString()
			}
		}))
}