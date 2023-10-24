import { PureComponent } from 'react';
import { Image, Platform } from 'react-native'
import t from 't'

import { Form } from 'co/form'
import Goto from 'co/goto'
import { WelcomeView, IntroView, IntroTitle, IntroSubtitle } from './style'
import jwt from './jwt'

class AuthWelcome extends PureComponent {
	onLogin = ()=>
		this.props.navigation.navigate('login')

	onRegister = ()=>
		this.props.navigation.navigate('register')

	onApple = ()=>
		this.props.navigation.navigate('native', { provider: 'apple' })

	onGoogle = ()=>
		this.props.navigation.navigate('native', { provider: 'google' })

	render() {
		return (
			<WelcomeView>
				<IntroView>
					<Image source={require('./assets/logoBig.png')} fadeDuration={0} />
					<IntroTitle>{t.s('welcome')} Raindrop.io</IntroTitle>
					<IntroSubtitle>{t.s('welcomeSlide1D')}</IntroSubtitle>
				</IntroView>

				<Form>
					<Goto
						icon='mail' variant='fill'
						label={t.s('signIn')}
						onPress={this.onLogin} />

					<Goto
						last
						icon='mail' variant='fill'
						label={t.s('register')}
						onPress={this.onRegister} />
				</Form>

				<Form>
					<Goto 
						icon='apple' variant='fill' color='text.regular'
						label={`${t.s('signInSocial')} Apple`}
						onPress={Platform.OS=='ios' && parseInt(Platform.Version, 10)>=13 ? this.onApple : jwt.apple} />

					<Goto
						last
						icon='google' variant='fill' color='google'
						label={`${t.s('signInSocial')} Google`}
						onPress={Platform.OS=='ios' ? jwt.google : this.onGoogle} />
				</Form>
			</WelcomeView>
		)
	}
}

AuthWelcome.options = {
	headerShown: false
}

export default AuthWelcome