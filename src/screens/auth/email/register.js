import React from 'react'
import t from 't'
import { Linking } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { registerWithPassword } from 'data/actions/user'
import { userStatus, errorReason } from 'data/selectors/user'
import { links } from 'config'

import { ScrollForm, Form, Input, InputPassword, InputEmail } from 'co/form'
import Button, { Buttons } from 'co/button'
import { SubInfo, SubInfoText, SubInfoLink } from './style'

class AuthEmailRegister extends React.PureComponent {
	static options = {
		title: t.s('register')
	}

	state = {
		name: '',
		email: '',
		password: ''
	}

	_email = React.createRef()
	_password = React.createRef()

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status && this.props.status == 'error')
			this.props.navigation.push('overlay', { screen: 'error', params: { error: this.props.error } })
	}

	onSubmit = ()=>
		this.props.registerWithPassword(this.state)

	onTerms = ()=>
		Linking.openURL(links.help.terms)

	onPrivacy = ()=>
		Linking.openURL(links.help.privacy)

	onNextEmail = ()=>
		this._email.current && this._email.current.focus()

	onNextPassword = ()=>
		this._password.current && this._password.current.focus()

	render() {
		const { status } = this.props
		const isLoading = status=='loading'

		return (
			<ScrollForm>
				<Form>
					<Input 
						editable={!isLoading}
						value={this.state.name}
						autoFocus={true}
						blurOnSubmit={false}
						placeholder={t.s('username')}
						textContentType='username'
						autoCapitalize='none'
						returnKeyType='next'
						onChangeText={(text)=>this.setState({name: text})}
						onSubmitEditing={this.onNextEmail} />

					<InputEmail 
						editable={!isLoading}
						ref={this._email}
						value={this.state.email}
						blurOnSubmit={false}
						placeholder='Email'
						textContentType='username'
						returnKeyType='next'
						onChangeText={(text)=>this.setState({email: text})}
						onSubmitEditing={this.onNextPassword} />

					<InputPassword 
						last
						editable={!isLoading}
						ref={this._password}
						value={this.state.password}
						placeholder={t.s('password')}
						textContentType='newPassword'
						onChangeText={(text)=>this.setState({password: text})}
						onSubmitEditing={this.onSubmit} />
				</Form>

				<Buttons vertical>
					<Button 
						bold
						background='color.accent'
						disabled={isLoading} 
						onPress={this.onSubmit}
						title={t.s('register')} />
				</Buttons>
				
				<SubInfo>
					<SubInfoText>{t.s('privacyTerms')}</SubInfoText>
					<BorderlessButton onPress={this.onTerms}>
						<SubInfoLink>{t.s('termsOfService')}</SubInfoLink>
					</BorderlessButton>
					<SubInfoText> {t.s('und')} </SubInfoText>
					<BorderlessButton onPress={this.onPrivacy}>
						<SubInfoLink>{t.s('privacyPolicy')}</SubInfoLink>
					</BorderlessButton>
				</SubInfo>
			</ScrollForm>
		)
	}
}

export default connect(
	(state)=>({
		status: userStatus(state).register,
		error: errorReason(state).register
	}),
	{ registerWithPassword }
)(AuthEmailRegister)