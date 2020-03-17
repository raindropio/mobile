import React from 'react'
import t from 't'
import {Alert, Linking} from 'react-native'
import {
	Form,
	InputPassword,
	InputEmail,
} from 'co/style/form'
import {
	ButtonLink,
	ButtonAction
} from 'co/common/button'
import LoadingView from 'co/common/loadingView'

export default class AuthEmailLogin extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status && this.props.status == 'error')
			Alert.alert(
				(this.props.error && this.props.error.message) ?
					t.s(this.props.error.message) :
					t.s('server7')
			)
	}

	onSubmit = ()=>{
		this.props.onSubmit(this.state)
	}

	onRecoverPassword = ()=>{
		Linking.openURL('https://raindrop.io/app/#/account/reset')
	}

	onNextField = ()=>this._password && this._password.focus()

	bindPassword = (r)=>this._password=r

	render() {
		const { status } = this.props
		const isLoading = status=='loading'

		return (
			<LoadingView loading={isLoading}>
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
						ref={this.bindPassword}
						value={this.state.password}
						placeholder={t.s('password')}
						textContentType='password'
						returnKeyType='done'
						onChangeText={(text)=>this.setState({password: text})}
						onSubmitEditing={this.onSubmit} />
				</Form>

				<ButtonAction disabled={isLoading} onPress={this.onSubmit}>{t.s('signIn')}</ButtonAction>
				<ButtonLink disabled={isLoading} onPress={this.onRecoverPassword}>{t.s('recoverPassword')}</ButtonLink>
			</LoadingView>
		)
	}
}