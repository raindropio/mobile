import React from 'react'
import t from 't'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { loginWithPassword } from 'data/actions/user'
import { userStatus, errorReason } from 'data/selectors/user'

import { ScrollForm, Form, InputPassword, InputEmail } from 'co/style/form'
import { ButtonLink, ButtonAction } from 'co/common/button'
import LoadingView from 'co/common/loadingView'
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
			<LoadingView loading={isLoading}>
				<ScrollForm>
					<Form first>
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

					<ButtonAction disabled={isLoading} onPress={this.onSubmit}>{t.s('signIn')}</ButtonAction>
					<ButtonLink disabled={isLoading} onPress={this.onRecoverPassword}>{t.s('recoverPassword')}</ButtonLink>
				</ScrollForm>
			</LoadingView>
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