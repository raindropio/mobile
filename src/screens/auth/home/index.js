import { Image } from 'react-native'
import t from 't'

import { Form } from 'co/form'
import Goto from 'co/goto'
import { WelcomeView, IntroView, IntroTitle, IntroSubtitle } from './style'

function AuthWelcome({ navigation }) {
	const onLogin = ()=>
		navigation.navigate('login')

	const onRegister = ()=>
		navigation.navigate('register')

	const onApple = ()=>
		navigation.navigate('native', { provider: 'apple' })

	const onGoogle = ()=>
		navigation.navigate('native', { provider: 'google' })

	return (
		<WelcomeView>
			<IntroView>
				<Image source={require('./assets/logoBig.png')} fadeDuration={0} />
				<IntroTitle>{t.s('welcome')} Raindrop.io</IntroTitle>
				<IntroSubtitle>{t.s('raindropTagline')}</IntroSubtitle>
			</IntroView>

			<Form>
				<Goto
					icon='mail' variant='fill'
					label={t.s('signIn')}
					onPress={onLogin} />

				<Goto
					last
					icon='mail' variant='fill'
					label={t.s('register')}
					onPress={onRegister} />
			</Form>

			<Form>
				<Goto
					icon='apple' variant='fill' color='text.regular'
					label={`${t.s('signInSocial')} Apple`}
					onPress={onApple} />

				<Goto
					last
					icon='google' variant='fill' color='google'
					label={`${t.s('signInSocial')} Google`}
					onPress={onGoogle} />
			</Form>
		</WelcomeView>
	)
}

AuthWelcome.options = {
	headerShown: false
}

export default AuthWelcome