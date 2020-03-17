import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import WebView from 'co/common/webview'
import { isExtension } from 'modules/native'

import { ButtonAction, ButtonLink } from 'co/common/button'
import {
	Wrap
} from './style'

export default class ProStatus extends React.PureComponent {
	state = {
		showButton: false
	}

	async componentDidMount() {
		this.setState({
			showButton: !(await isExtension())
		})
	}

	renderButtons = ()=>{
		if (!this.state.showButton || this.props.subscription.loading)
			return null

		//no subscription
		if (!this.props.subscription.plan)
			return <ButtonAction onPress={this.props.onSubscribe}>{t.s('upgradeToPro')}</ButtonAction>

		switch (this.props.subscription.gateway &&
			this.props.subscription.gateway.name) {
			//active for the current platform
			case (Platform.OS=='ios' ? 'apple' : 'google'):
				return (
					<React.Fragment>
						<ButtonAction onPress={this.props.onChange}>{t.s('change')+' '+t.s('subscription').toLowerCase()}</ButtonAction>
						<ButtonLink onPress={this.props.onLink}>{t.s('cancel')+' '+t.s('subscription').toLowerCase()}</ButtonLink>
					</React.Fragment>
				)
		
			//any other subscription
			default:
				return <ButtonLink onPress={this.props.onLink}>{t.s('change')+' '+t.s('subscription').toLowerCase()}</ButtonLink>
		}
	}

	render() {
		return (
			<Wrap>
				<WebView
					link={'https://raindrop.io/static/pro/?frame=1&pro=1'} />

				{this.renderButtons()}
			</Wrap>
		)
	}
}