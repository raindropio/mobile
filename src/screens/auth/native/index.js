import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason } from 'data/selectors/user'
import { loginNative } from 'data/actions/user'

import apple from './apple.ios'
import google from './google'

import { withOverlay } from 'co/navigation/screen'
import PreventClose from 'co/navigation/preventClose'
import { ScrollForm } from 'co/form'
import { ActivityIndicator } from 'co/native'

const providers = { apple, google }

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
                else{
                    setCanceled(true)
                    return navigation.goBack()
                }
            })
            .catch(error=>{
                navigation.push('overlay', { screen: 'error', params: { error } })

                setCanceled(true)
                return navigation.goBack()
            })
    }, [])

    useEffect(()=>{
        if (authorized == 'yes')
            navigation.goBack()
        else if (error)
            navigation.push('overlay', { screen: 'error', params: { error } })
    }, [authorized, error])
    
    return (
        <ScrollForm centerContent={true}>
            {error || canceled ? null : <PreventClose />}
            <ActivityIndicator color='blue' />
        </ScrollForm>
    )
}

export default withOverlay(NativeAuth)