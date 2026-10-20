import { useState, useRef, useEffect, Fragment } from 'react'
import t from 't'
import { Linking, Alert } from 'react-native'
import { Touchable } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { registerWithPassword } from 'data/actions/user'
import { userStatus, errorReason } from 'data/selectors/user'
import { links } from 'config'

import { ScrollForm, Form, Input, InputPassword, InputEmail } from 'co/form'
import Button, { Buttons } from 'co/button'
import { SubInfo, SubInfoText, SubInfoLink } from './style'

function AuthEmailRegister() {
	const dispatch = useDispatch()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const status = useSelector(state=>userStatus(state).register)
	const error = useSelector(state=>errorReason(state).register)

	const emailRef = useRef(null)
	const passwordRef = useRef(null)

	const prevStatus = useRef(status)
	useEffect(()=>{
		if (status == 'error' && prevStatus.current != 'error')
			Alert.alert(t.s('error'), error?.message)
		prevStatus.current = status
	}, [status, error])

	const onSubmit = ()=>
		dispatch(registerWithPassword({ name, email, password }))

	const onTerms = ()=>
		Linking.openURL(links.help.terms)

	const onPrivacy = ()=>
		Linking.openURL(links.help.privacy)

	const onNextEmail = ()=>
		emailRef.current?.focus()

	const onNextPassword = ()=>
		passwordRef.current?.focus()

	const isLoading = status=='loading'

	return (
		<ScrollForm>
			<Form>
				<Input
					editable={!isLoading}
					value={name}
					autoFocus={true}
					blurOnSubmit={false}
					placeholder={t.s('username')}
					textContentType='username'
					autoCapitalize='none'
					returnKeyType='next'
					onChangeText={setName}
					onSubmitEditing={onNextEmail} />

				<InputEmail
					editable={!isLoading}
					ref={emailRef}
					value={email}
					blurOnSubmit={false}
					placeholder={t.s('email')}
					textContentType='username'
					returnKeyType='next'
					onChangeText={setEmail}
					onSubmitEditing={onNextPassword} />

				<InputPassword
					last
					editable={!isLoading}
					ref={passwordRef}
					value={password}
					placeholder={t.s('password')}
					textContentType='newPassword'
					onChangeText={setPassword}
					onSubmitEditing={onSubmit} />
			</Form>

			<Buttons vertical>
				<Button
					bold
					background='color.accent'
					disabled={isLoading}
					onPress={onSubmit}
					title={t.s('register')} />
			</Buttons>

			<SubInfo>
				{t.s('privacyTermsFull').split(/\{0\}|\{1\}/).map((part, i) => (
					<Fragment key={i}>
						<SubInfoText>{part}</SubInfoText>
						{i === 0 && (
							<Touchable activeOpacity={0.2} onPress={onTerms}>
								<SubInfoLink>{t.s('termsOfService')}</SubInfoLink>
							</Touchable>
						)}
						{i === 1 && (
							<Touchable activeOpacity={0.2} onPress={onPrivacy}>
								<SubInfoLink>{t.s('privacyPolicy')}</SubInfoLink>
							</Touchable>
						)}
					</Fragment>
				))}
			</SubInfo>
		</ScrollForm>
	)
}

AuthEmailRegister.options = {
	title: t.s('register'),
	headerShadowVisible: false
}

export default AuthEmailRegister