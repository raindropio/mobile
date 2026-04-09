import { createRef, Fragment, PureComponent } from 'react';
import t from 't'
import { Linking, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { registerWithPassword } from 'data/actions/user'
import { userStatus, errorReason } from 'data/selectors/user'
import { links } from 'config'

import { ScrollForm, Form, Input, InputPassword, InputEmail } from 'co/form'
import Button, { Buttons } from 'co/button'
import { SubInfo, SubInfoText, SubInfoLink } from './style'

class AuthEmailRegister extends PureComponent {
	static options = {
		title: t.s('register'),
		headerShadowVisible: false
	}

	state = {
		name: '',
		email: '',
		password: ''
	}

	_email = createRef()
	_password = createRef()

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status && this.props.status == 'error')
			Alert.alert(t.s('error'), this.props.error?.message)
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
						placeholder={t.s('email')}
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
					{t.s('privacyTermsFull').split(/\{0\}|\{1\}/).map((part, i) => (
						<Fragment key={i}>
							<SubInfoText>{part}</SubInfoText>
							{i === 0 && (
								<TouchableOpacity onPress={this.onTerms}>
									<SubInfoLink>{t.s('termsOfService')}</SubInfoLink>
								</TouchableOpacity>
							)}
							{i === 1 && (
								<TouchableOpacity onPress={this.onPrivacy}>
									<SubInfoLink>{t.s('privacyPolicy')}</SubInfoLink>
								</TouchableOpacity>
							)}
						</Fragment>
					))}
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