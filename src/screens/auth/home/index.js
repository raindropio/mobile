import React from 'react'
import { Image, Platform } from 'react-native'
import t from 't'

import { Form } from 'co/form'
import Goto from 'co/goto'
import { WelcomeView, IntroView, IntroTitle, IntroSubtitle } from './style'
import jwt from './jwt'

class AuthWelcome extends React.PureComponent {
	state = {
		showAll: false
	}

	onEmail = ()=>
		this.props.navigation.navigate('email')

	onApple = ()=>
		this.props.navigation.navigate('native', { provider: 'apple' })

	onGoogle = ()=>
		this.props.navigation.navigate('native', { provider: 'google' })

	onFacebook = ()=>
		this.props.navigation.navigate('native', { provider: 'facebook' })

	onMore = ()=>
		this.setState({showAll: true})

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

					{this.state.showAll && [
						<Goto
							key='facebook'
							icon='facebook-box' variant='fill' color='facebook' action=''
							label={`${t.s('signInSocial')} Facebook`}
							onPress={this.onFacebook} />,

						<Goto
							key='twitter'
							icon='twitter' variant='fill' color='twitter' action=''
							label={`${t.s('signInSocial')} Twitter`}
							onPress={jwt.twitter} />,

						<Goto
							last
							key='vkontakte' 
							icon='account-box' variant='fill' color='vkontakte' action=''
							label={`${t.s('signInSocial')} VK`}
							onPress={jwt.vkontakte} />
					]}
					
					{!this.state.showAll && (
						<Goto
							last
							action='arrow-down-s'
							label={`${t.s('show')} ${t.s('other')}…`}
							onPress={this.onMore} />
					)}
				</Form>
			</WelcomeView>
		)
	}
}

export default AuthWelcome