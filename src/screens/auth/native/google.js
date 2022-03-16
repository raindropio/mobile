import Config from 'react-native-config'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'

export default async function() {
    try{
        GoogleSignin.configure({
            iosClientId: `${Config.GOOGLE_CLIENT_ID_IOS}.apps.googleusercontent.com`, //GOOGLE_CLIENT_ID_IOS is OAuth 2.0 Client ID of iOS type
            webClientId: `${Config.GOOGLE_CLIENT_ID_ANDROID}.apps.googleusercontent.com`, //GOOGLE_CLIENT_ID_ANDROID is OAuth 2.0 Client ID of Web Application type (not Android type!)
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        })

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true, autoResolve: true })

        await GoogleSignin.getCurrentUser()
        await GoogleSignin.signOut()
        await GoogleSignin.signIn()

        const { accessToken } = await GoogleSignin.getTokens()

        return {
            provider: 'google',
            token: '?access_token='+accessToken
        }
    } catch(e) {
        if (e.code === statusCodes.SIGN_IN_CANCELLED)
            return null

        throw e
    }
}