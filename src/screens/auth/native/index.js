import t from 't'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { loginNative } from 'data/actions/user'

import apple from './apple.ios'
import google from './google'

const providers = { apple, google }

function NativeAuth({ route: { params={} }, navigation }) {
    const { provider } = params
    const dispatch = useDispatch()

    useEffect(()=>{
        providers[provider]()
            .then(params => {
                if (params)
                    return new Promise((res,rej)=>
                        dispatch(loginNative(params, res, rej))
                    )
            })
            .then(success=>{
                if (success?.tfa)
                    navigation.replace('tfa', { token: success.tfa })
                else
                    navigation.goBack()
            })
            .catch(error => {
                Alert.alert(t.s('error'), error?.message)
            })
    }, [])
    
    return null
}

NativeAuth.options = {
    headerShown: false,
    animation: 'fade',
    presentation: 'transparentModal'
}

export default NativeAuth