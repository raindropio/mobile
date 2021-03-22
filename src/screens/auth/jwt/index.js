import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason } from 'data/selectors/user'
import { loginWithJWT } from 'data/actions/user'

import { withOverlay } from 'co/navigation/screen'
import PreventClose from 'co/navigation/preventClose'
import { ScrollForm } from 'co/form'
import { ActivityIndicator } from 'co/native'

function JWT({ route: { params={} }, navigation }) {
    const { token } = params

    const dispatch = useDispatch()
    const authorized = useSelector(state=>userStatus(state).authorized)
    const error = useSelector(state=>errorReason(state).jwt)

    useEffect(()=>{
        dispatch(loginWithJWT(token))
    }, [token])

    useEffect(()=>{
        if (authorized == 'yes')
            navigation.goBack()
        else if (error)
            navigation.push('overlay', { screen: 'error', params: { error } })
    }, [authorized, error])
    
    return (
        <ScrollForm centerContent={true}>
            {!error && <PreventClose />}
            <ActivityIndicator color='blue' />
        </ScrollForm>
    )
}

export default withOverlay(JWT)