import React from 'react'
import t from 't'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { loginWithPassword } from 'data/actions/user'
import { userStatus, errorReason } from 'data/selectors/user'

import { ScrollForm, Form, InputPassword, InputEmail } from 'co/style/form'
import Button, { Buttons } from 'co/button'
import { Error } from 'co/overlay'

class AuthEmailLogin extends React.PureComponent {
	static options = {
		title: t.s('signIn')
	}

	state = {
		email: '',
		password: ''
	}

	_password = React.createRef()

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status && this.props.status == 'error')
			Error(this.props.error)
	}

	onSubmit = ()=>
		this.props.loginWithPassword(this.state)

	onRecoverPassword = ()=>
		Linking.openURL('https://app.raindrop.io/account/lost')

	onNextField = ()=>
		this._password.current && this._password.current.focus()

	render() {
		const { status } = this.props
		const isLoading = status=='loading'

		return (
			<ScrollForm>
				<Form>
					<InputEmail 
						editable={!isLoading}
						value={this.state.email}
						autoFocus={true}
						blurOnSubmit={false}
						placeholder='Email'
						textContentType='username'
						returnKeyType='next'
						onChangeText={(text)=>this.setState({email: text})}
						onSubmitEditing={this.onNextField} />

					<InputPassword 
						last
						editable={!isLoading}
						ref={this._password}
						value={this.state.password}
						placeholder={t.s('password')}
						textContentType='password'
						returnKeyType='done'
						onChangeText={(text)=>this.setState({password: text})}
						onSubmitEditing={this.onSubmit} />
				</Form>

				<Buttons vertical>
					<Button 
						background='color.accent'
						disabled={isLoading} 
						onPress={this.onSubmit}
						title={t.s('signIn')} />

					<Button 
						disabled={isLoading} 
						onPress={this.onRecoverPassword}
						title={t.s('recoverPassword')} />
				</Buttons>
			</ScrollForm>
		)
	}
}

export default connect(
	(state)=>({
		status: userStatus(state).login,
		error: errorReason(state).login
	}),
	{ loginWithPassword }
)(AuthEmailLogin)