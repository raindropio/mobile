import { useState, useCallback, useEffect } from 'react'
import { Alert } from 'react-native'
import t from 't'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason } from 'data/selectors/user'
import { loginWithTFA } from 'data/actions/user'

import { ScrollForm, Form, Input } from 'co/form'
import Button, { Buttons } from 'co/button'

function AuthTFA({ route: { params: { token } }, navigation }) {
    const dispatch = useDispatch()

    const [code, setCode] = useState('')
    const status = useSelector(state=>userStatus(state).tfa)
    const error = useSelector(state=>errorReason(state).tfa)

    useEffect(()=>{
        if (status == 'error' && error)
            Alert.alert(t.s('error'), error?.message)
    }, [error, navigation])

    const onSubmit = useCallback(()=>{
        dispatch(loginWithTFA({ token, code }))
    }, [code, token])

    useEffect(()=>{
        if (code.length == 6)
            onSubmit()
    }, [code.length, onSubmit])

    return (
        <ScrollForm>
            <Form>
                <Input last
                    editable={status != 'loading'}
                    value={code}
                    autoFocus={true}
                    blurOnSubmit={false}
                    placeholder={t.s('enterTotp')}
                    keyboardType='numeric'
                    textContentType='oneTimeCode'
                    autoComplete='one-time-code'
                    importantForAutofill='yes'
                    autoCapitalize='none'
                    returnKeyType='done'
                    onChangeText={setCode}
                    onSubmitEditing={onSubmit} />
            </Form>

            <Buttons vertical>
                <Button 
                    bold
                    background='color.accent'
                    disabled={status == 'loading'} 
                    onPress={onSubmit}
                    title={t.s('signIn')} />
            </Buttons>
        </ScrollForm>
    )
}

AuthTFA.options = {
    title: t.s('tfa'),
    animation: 'fade',
    headerShadowVisible: false
}

export default AuthTFA