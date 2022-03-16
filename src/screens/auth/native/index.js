import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason } from 'data/selectors/user'
import { loginNative } from 'data/actions/user'

import apple from './apple.ios'
import facebook from './facebook'
import google from './google'

import PreventClose from 'co/navigation/preventClose'
import { ScrollForm } from 'co/form'
import { ActivityIndicator } from 'co/native'

const providers = { apple, facebook, google }

function NativeAuth({ route: { params={} } , navigation }) {
    const { provider } = params

    const dispatch = useDispatch()
    const authorized = useSelector(state=>userStatus(state).authorized)
    const error = useSelector(state=>errorReason(state).native)
    const [canceled, setCanceled] = useState(false)

    useEffect(()=>{
        providers[provider]()
            .then(params=>{
                if (params)
                    dispatch(loginNative(params))
                setCanceled(true)
            })
            .catch(error=>{
                navigation.push('overlay', { screen: 'error', params: { error } })
                setCanceled(true)
            })
    }, [])

    useEffect(()=>{
        if (error)
            navigation.push('overlay', { screen: 'error', params: { error } })
    }, [authorized, error])

    useEffect(()=>{
        if (canceled)
            navigation.goBack()
    }, [canceled])
    
    return (
        <ScrollForm centerContent={true}>
            {error || canceled ? null : <PreventClose />}
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