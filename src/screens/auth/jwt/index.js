import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason } from 'data/selectors/user'
import { loginWithJWT } from 'data/actions/user'

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
        if (error)
            navigation.push('overlay/error', { error })
    }, [authorized, error])
    
    return (
        <ScrollForm centerContent={true}>
            {!error && <PreventClose />}
            <ActivityIndicator color='blue' />
        </ScrollForm>
    )
}

JWT.options = {
    stackAnimation: 'fade',
    stackPresentation: 'transparentModal',
    contentStyle: {
        backgroundColor: '#00000020'
    }
}

export default JWT