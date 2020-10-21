import appleAuth from '@invertase/react-native-apple-authentication'

export default async function() {
    //login
	try{
        return await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.REFRESH,
            requestedScopes: [
                appleAuth.Scope.EMAIL,
                appleAuth.Scope.FULL_NAME,
            ],
        })
    } catch (e) {
        if (error.code === appleAuth.State.CANCELED)
            return
            
        console.log(e)
        throw e
    }
}