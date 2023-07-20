import { PureComponent } from 'react';
import { Image, Platform } from 'react-native'
import t from 't'

import { Form } from 'co/form'
import Goto from 'co/goto'
import { WelcomeView, IntroView, IntroTitle, IntroSubtitle } from './style'
import jwt from './jwt'

class AuthWelcome extends PureComponent {
	onEmail = ()=>
		this.props.navigation.navigate('email')

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
						last
						icon='mail' variant='fill' action=''
						label={`Email ${t.s('or')} ${t.s('username').toLowerCase()}`}
						onPress={this.onEmail} />
				</Form>

				<Form>
					<Goto 
						icon='apple' variant='fill' color='text.regular' action=''
						label={`${t.s('signInSocial')} Apple`}
						onPress={Platform.OS=='ios' && parseInt(Platform.Version, 10)>=13 ? this.onApple : jwt.apple} />

					<Goto
						icon='google' variant='fill' color='google' action=''
						label={`${t.s('signInSocial')} Google`}
						onPress={Platform.OS=='ios' ? jwt.google : this.onGoogle} />
				</Form>
			</WelcomeView>
		)
	}
}

export default AuthWelcome