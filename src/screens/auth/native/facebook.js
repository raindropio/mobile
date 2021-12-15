import Config from 'react-native-config'
import {
    Settings,
    AccessToken,
    LoginManager
} from 'react-native-fbsdk-next'

export default async function() {
    Settings.setAppID(Config.FACEBOOK_APP_ID)
    Settings.initializeSDK()

    LoginManager.logOut()
    const { isCancelled } = await LoginManager.logInWithPermissions(['public_profile', 'email'])
    if (isCancelled)
        return null

    const { accessToken } = await AccessToken.getCurrentAccessToken()

    return {
        provider: 'facebook',
        token: `?access_token=${accessToken}`
    }
}