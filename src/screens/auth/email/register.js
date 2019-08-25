import React from 'react'
import t from 't'
import { Alert, TouchableOpacity, Linking } from 'react-native'
import {
	Form,
	Input,
	InputPassword,
	InputEmail
} from 'co/style/form'
import {
	ButtonAction
} from 'co/common/button'
import {
	SubInfo,
	SubInfoText,
	SubInfoLink
} from './style'
import LoadingView from 'co/common/loadingView'

export default class AuthEmailLogin extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fullName: '',
			email: '',
			password: ''
		}

		this._email = {}
		this._password = {}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status && this.props.status == 'error')
			Alert.alert(t.s('server'+this.props.error))
	}

	onSubmit = ()=>{
		this.props.onSubmit(this.state)
	}

	onTerms = ()=>{
		Linking.openURL('https://raindrop.io/app/#/pages/terms')
	}

	onPrivacy = ()=>{
		Linking.openURL('https://raindrop.io/app/#/pages/privacy')
	}

	onNextEmail = ()=>this._email && this._email.focus()
	onNextPassword = ()=>this._password && this._password.focus()

	bindEmail = (r)=>this._email=r
	bindPassword = (r)=>this._password=r

	render() {
		const { status } = this.props
		const isLoading = status=='loading'

		return (
			<LoadingView loading={isLoading}>
				<Form first>
					<Input 
						editable={!isLoading}
						value={this.state.fullName}
						autoFocus={true}
						blurOnSubmit={false}
						placeholder={t.s('yourName')}
						returnKeyType='next'
						onChangeText={(text)=>this.setState({fullName: text})}
						onSubmitEditing={this.onNextEmail} />

					<InputEmail 
						editable={!isLoading}
						ref={this.bindEmail}
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
						ref={this.bindPassword}
						value={this.state.password}
						placeholder={t.s('password')}
						textContentType='newPassword'
						onChangeText={(text)=>this.setState({password: text})}
						onSubmitEditing={this.onSubmit} />
				</Form>

				<ButtonAction disabled={isLoading} onPress={this.onSubmit}>{t.s('register')}</ButtonAction>
				
				<SubInfo>
					<SubInfoText>{t.s('privacyTerms')}</SubInfoText>
					<TouchableOpacity onPress={this.onTerms}><SubInfoLink>{t.s('termsOfService')}</SubInfoLink></TouchableOpacity>
					<SubInfoText> {t.s('und')} </SubInfoText>
					<TouchableOpacity onPress={this.onPrivacy}><SubInfoLink>{t.s('privacyPolicy')}</SubInfoLink></TouchableOpacity>
				</SubInfo>
			</LoadingView>
		)
	}
}