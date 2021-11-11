import Config from 'react-native-config'
import { Platform } from 'react-native'
import {
    Settings,
    AccessToken,
    AuthenticationToken,
    LoginManager
} from 'react-native-fbsdk-next'

export default async function() {
    Settings.setAppID(Config.FACEBOOK_APP_ID)

    const { isCancelled } = await LoginManager.logInWithPermissions(['public_profile', 'email'], 'limited')
    if (isCancelled)
        return null

    var access_token = ''

    switch(Platform.OS) {
        case 'ios':{
            const { authenticationToken } = await AuthenticationToken.getAuthenticationTokenIOS()
            access_token = authenticationToken;
        }
        break
        
        default:{
            const { accessToken } = await AccessToken.getCurrentAccessToken()
            access_token = accessToken
        }
        break
    }

    return {
        provider: 'facebook',
        token: `?access_token=${access_token}`
    }
}