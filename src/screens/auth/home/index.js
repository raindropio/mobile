import React from 'react'
import { Image, View, Platform } from 'react-native'
import { TransitionPresets } from '@react-navigation/stack'
import t from 't'

import Icon from 'co/icon'
import jwt from './jwt'
import {
	WelcomeView,
	IntroView,
	IntroTitle,
	IntroSubtitle,
	BlocksView,
	Block,
	BlockTap,
	BlockText,
} from './style'

const c = {
	google: '#EA4335',
	facebook: '#3B5998',
	twitter: '#1DA1F2',
	vk: '#45668E',
}

class AuthWelcome extends React.PureComponent {
	state = {
		showAll: false
	}

	onEmail = ()=>
		this.props.navigation.navigate('email')

	onApple = ()=>
		this.props.navigation.navigate('native', { provider: 'apple' })

	onMore = ()=>
		this.setState({showAll: true})

	render() {
		return (
			<WelcomeView>
				<IntroView>
					<Image source={require('./assets/logoBig.png')} />
					<IntroTitle>{t.s('welcome')} Raindrop.io</IntroTitle>
					<IntroSubtitle>{t.s('welcomeSlide1D')}</IntroSubtitle>
				</IntroView>

				<View>
					<BlocksView>
						<BlockTap variant='black' onPress={Platform.OS=='ios' && parseInt(Platform.Version, 10)>=13 ? this.onApple : jwt.apple}><Block>
							<Icon name='apple' variant='fill' style={{color: 'white'}} />
							<BlockText white>{t.s('signInSocial')} Apple</BlockText>
						</Block></BlockTap>

						<BlockTap onPress={jwt.google}><Block>
							<Icon name='google' variant='fill' style={{color: '#EA4335'}} />
							<BlockText>{t.s('signInSocial')} Google</BlockText>
						</Block></BlockTap>

						{this.state.showAll && [
							<BlockTap key='facebook' onPress={jwt.facebook}><Block>
								<Icon name='facebook-circle' variant='fill' style={{color: c.facebook}} />
								<BlockText>{t.s('signInSocial')} Facebook</BlockText>
							</Block></BlockTap>,

							<BlockTap key='twitter' onPress={jwt.twitter}><Block>
								<Icon name='twitter' variant='fill' style={{color: c.twitter}} />
								<BlockText>{t.s('signInSocial')} Twitter</BlockText>
							</Block></BlockTap>,

							<BlockTap key='vkontakte' onPress={jwt.vkontakte}><Block>
								<BlockText>{t.s('signInSocial')} VK</BlockText>
							</Block></BlockTap>
						]}

						<BlockTap onPress={this.onEmail}><Block>
							<BlockText>Email {t.s('or')} {t.s('username').toLowerCase()}</BlockText>
						</Block></BlockTap>

						{!this.state.showAll && <BlockTap variant='gray' onPress={this.onMore}><Block>
							<BlockText>{t.s('show')} {t.s('other')}…</BlockText>
						</Block></BlockTap>}
					</BlocksView>
				</View>
			</WelcomeView>
		)
	}
}

AuthWelcome.options = {
	...TransitionPresets.RevealFromBottomAndroid
}

export default AuthWelcome