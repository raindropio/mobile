import { appleAuthAndroid } from '@invertase/react-native-apple-authentication'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import Config from 'react-native-config'

export default async function() {
    const rawNonce = uuid()
    const state = uuid()

    appleAuthAndroid.configure({
        clientId: Config.APPLE_SIGN_IN_CLIENT_ID,
        redirectUri: Config.APPLE_SIGN_IN_REDIRECT,
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
    })

    const { code, id_token, user={} } = await appleAuthAndroid.signIn()

    return {
        authorizationCode: code,
        identityToken: id_token,
        fullName: user.name||{},
        email: user.email||{}
    }
}