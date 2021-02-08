import appleAuth from '@invertase/react-native-apple-authentication'

export default async function() {
    try{
        const { fullName, authorizationCode, identityToken } = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.REFRESH,
            requestedScopes: [
                appleAuth.Scope.EMAIL,
                appleAuth.Scope.FULL_NAME,
            ],
        })

        //full name
        let display_name = ''
        try { display_name = [ fullName.familyName, fullName.givenName, fullName.middleName ].join(' ').trim() } catch(e){}

        return {
            provider: 'apple',
            token: `?code=${authorizationCode}&identity_token=${identityToken}&display_name=${encodeURIComponent(display_name)}`
        }
    } catch(e) {
        console.log(e.code)
        if (e.code === appleAuth.Error.CANCELED)
            return null

        throw e
    }
}