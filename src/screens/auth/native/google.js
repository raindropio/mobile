import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import Config from 'react-native-config'

export default async function() {
    try{
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true, autoResolve: true })
        await GoogleSignin.configure({
            iosClientId: `${Config.GOOGLE_CLIENT_ID_IOS}.apps.googleusercontent.com`,
            webClientId: `${Config.GOOGLE_CLIENT_ID_ANDROID}.apps.googleusercontent.com`,
            offlineAccess: true,
            forceCodeForRefreshToken: true
        })
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