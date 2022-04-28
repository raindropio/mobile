import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginNative } from 'data/actions/user'

import apple from './apple.ios'
import google from './google'

import { ScrollForm } from 'co/form'
import { ActivityIndicator } from 'co/native'

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
            .then(()=>{
                navigation.goBack()
            })
            .catch(error => {
                navigation.replace('overlay', { screen: 'error', params: { error } })
            })
    }, [])
    
    return (
        <ScrollForm centerContent={true}>
            <ActivityIndicator />
        </ScrollForm>
    )
}

NativeAuth.options = {
    stackAnimation: 'fade',
    stackPresentation: 'transparentModal',
    contentStyle: {
        backgroundColor: '#00000020'
    }
}

export default NativeAuth