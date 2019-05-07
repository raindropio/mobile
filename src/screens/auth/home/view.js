import React from 'react'
import Navigation from 'modules/navigation'
import t from 't'
import { authorize } from './social'

import {
	Image,
	View
} from 'react-native'
import {
	WelcomeView,
	IntroView,
	IntroTitle,
	IntroSubtitle,
	ContinueText,
	ErrorText,
	BlocksView,
	Block,
	BlockTap,
	BlockText,
	PreloaderView,
	Preloader
} from './style'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'

import { userStatus } from 'data/selectors/user'

const c = {
	google: '#EA4335',
	facebook: '#3B5998',
	twitter: '#1DA1F2',
	vk: '#45668E',
}

class AuthWelcome extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			status: ''
		}	
	}

	componentWillReceiveProps(nextProps) {
		this.setState({status: nextProps.nativeStatus})
	}

	onGoogle = ()=>{
		authorize('google')
			.then(({credentials})=>{
				this.props.actions.user.loginNative({
					provider: 'google',
					token: '?access_token='+credentials.accessToken//+'&refresh_token='+credentials.refreshToken
				})
			})
			.catch(() => {
				this.props.actions.user.refresh()
			})
	}

	onFacebook = ()=>{
		authorize('facebook')
			.then(({credentials})=>{
				this.props.actions.user.loginNative({
					provider: 'facebook',
					token: '?access_token='+credentials.accessToken
				})
			})
			.catch(() => {
				this.props.actions.user.refresh()
			})
	}

	onTwitter = ()=>{
		authorize('twitter')
			.then(({credentials, userId})=>{
				this.props.actions.user.loginNative({
					provider: 'twitter',
					token: '?oauth_token='+credentials.access_token+'&oauth_token_secret='+credentials.access_token_secret+'&user_id='+userId
				})
			})
			.catch((e) => {
				this.props.actions.user.refresh()
			})
	}

	onVkontakte = ()=>{
		authorize('vkontakte', this.props)
	}

	onEmail = ()=>{
		this.setState({status: ''})
		
		Navigation.showModal(this.props, 'auth/email')
	}

	render() {
		var title = <ContinueText>{`${t.s('register')} ${t.s('or')} ${t.s('signInSocial')}`.toUpperCase()}</ContinueText>, preloader;
		switch(this.state.status){
			case 'error':
				title = <ErrorText>{t.s('server').toUpperCase()}</ErrorText>
			break

			case 'loading':
				preloader = <PreloaderView><Preloader /></PreloaderView>
			break
		}

		return (
			<WelcomeView>
				<IntroView>
					<Image source={require('assets/images/logoBig.png')} />
					<IntroTitle>{t.s('welcome')} Raindrop.io</IntroTitle>
					<IntroSubtitle>{t.s('welcomeSlide1D')}</IntroSubtitle>
				</IntroView>

				{title}

				<View>
					{preloader}

					<BlocksView>
						<BlockTap onPress={this.onGoogle}><Block>
							<Image source={require('assets/images/social/google.png')} style={{tintColor:c.google}} />
							<BlockText color={c.google}>Google</BlockText>
						</Block></BlockTap>

						<BlockTap onPress={this.onFacebook}><Block>
							<Image source={require('assets/images/social/facebook.png')} style={{tintColor:c.facebook}} />
							<BlockText color={c.facebook}>Facebook</BlockText>
						</Block></BlockTap>

						<BlockTap onPress={this.onTwitter}><Block>
							<Image source={require('assets/images/social/twitter.png')} style={{tintColor:c.twitter}} />
							<BlockText color={c.twitter}>Twitter</BlockText>
						</Block></BlockTap>

						<BlockTap onPress={this.onVkontakte}><Block>
							<Image source={require('assets/images/social/vk.png')} style={{tintColor:c.vk}} />
							<BlockText color={c.vk}>VK</BlockText>
						</Block></BlockTap>

						<BlockTap onPress={this.onEmail} style={{width:'100%'}}><Block>
							<BlockText>Email {t.s('und')} {t.s('password').toLowerCase()}</BlockText>
						</Block></BlockTap>
					</BlocksView>
				</View>
			</WelcomeView>
		)
	}
}

export default connect(
	(state)=>{
		return {
			nativeStatus: userStatus(state).native
		}
	},
	(dispatch)=>({
		actions: {
			user: bindActionCreators(userActions, dispatch)
		}
	})
)(AuthWelcome)