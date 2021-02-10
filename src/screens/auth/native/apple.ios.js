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
            token: `?code=${authorizationCode}&identity_token=${identityToken}&display_name=${encodeURIComponent(display_name||'Unknown')}`
        }
    } catch(e) {
        switch(e.code) {
            case appleAuth.Error.CANCELED:
            case appleAuth.Error.UNKNOWN:
                return null

            case appleAuth.Error.INVALID_RESPONSE:
                throw new Error('The authorization request received an invalid response')

            case appleAuth.Error.NOT_HANDLED:
                throw new Error('The authorization request wasn\'t handled')

            case appleAuth.Error.FAILED:
                throw new Error('The authorization attempt failed')

            default:
                console.log(e.code)
                throw e
        }
    }
}