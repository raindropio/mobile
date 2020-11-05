import React from 'react'
import { Platform, Text } from 'react-native'
import { ThemeContext } from 'styled-components'
import t from 't'
import WebView from 'co/common/webview'
import { plan } from 'modules/format/subscription'

import { ButtonAction, ButtonLink } from 'co/common/button'
import {
	Wrap
} from './style'

export default class ProStatus extends React.PureComponent {
	static contextType = ThemeContext

	renderStatus = ()=>{
		const { subscription } = this.props

		if (subscription.plan)
			return (
				<Text>
					{plan(subscription)+' '+t.s('subscription').toLowerCase()}
				</Text>
			)

		return null
	}

	renderButtons = ()=>{
		if (!this.context.isExtension || this.props.subscription.loading)
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
				{this.renderStatus()}

				<WebView
					link={'https://raindrop.io/static/pro/?frame=1&pro=1'} />

				{this.renderButtons()}
			</Wrap>
		)
	}
}