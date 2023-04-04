import { useState, useCallback, useEffect } from 'react'
import t from 't'
import { Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithPassword } from 'data/actions/user'
import { userStatus, errorReason } from 'data/selectors/user'
import { links } from 'config'

import { ScrollForm, Form, InputPassword, Input } from 'co/form'
import Button, { Buttons } from 'co/button'

function AuthEmailLogin({ navigation }) {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const status = useSelector(state=>userStatus(state).login)
    const error = useSelector(state=>errorReason(state).login)

	useEffect(()=>{
        if (status == 'error' && error)
            navigation.push('overlay', { screen: 'error', params: { error } })
    }, [status, error, navigation])

	const onSubmit = useCallback(()=>{
        dispatch(loginWithPassword({ email, password }, success=>{
            if (success?.tfa)
				navigation.replace('tfa', { screen: 'login', params: { token: success.tfa } })
        }))
    }, [email, password, navigation])

	return (
		<ScrollForm>
			<Form>
				<Input 
					editable={status != 'loading'}
					value={email}
					autoFocus={true}
					blurOnSubmit={false}
					placeholder={`Email ${t.s('or')} ${t.s('username').toLowerCase()}`}
					textContentType='username'
					autoComplete='username'
					importantForAutofill='yes'
					autoCapitalize='none'
					returnKeyType='done'
					onChangeText={setEmail}
					onSubmitEditing={onSubmit} />

				<InputPassword 
					last
					editable={status != 'loading'}
					value={password}
					placeholder={t.s('password')}
					textContentType='password'
					autoComplete='password'
					importantForAutofill='yes'
					returnKeyType='done'
					onChangeText={setPassword}
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

			<Buttons vertical>
				<Button 
					disabled={status == 'loading'} 
					onPress={()=>Linking.openURL(links.app.account.lost)}
					title={t.s('recoverPassword')} />
			</Buttons>
		</ScrollForm>
	)
}

AuthEmailLogin.options = {
	title: t.s('signIn')
}

export default AuthEmailLogin