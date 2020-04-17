import appleAuth, {
    AppleAuthError,
    AppleAuthRequestScope,
    AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'

export default async function() {
    //login
	try{
        return await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.REFRESH,
            requestedScopes: [
                AppleAuthRequestScope.EMAIL,
                AppleAuthRequestScope.FULL_NAME,
            ],
        })
    } catch (e) {
        if (error.code === AppleAuthError.CANCELED)
            return
            
        console.log(e)
        throw e
    }
}