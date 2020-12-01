import React from 'react'
import t from 't'
import { Platform, Text } from 'react-native'
import { connect } from 'react-redux'
import { loadSubscription } from 'data/actions/user'
import { user, subscription } from 'data/selectors/user'

import { ThemeContext } from 'styled-components'
import { plan } from 'modules/format/subscription'
import Browser from 'co/navigation/browser'
import { WebView } from 'co/native'
import Button from 'co/button'
import { Wrap } from './style'

class ProStatus extends React.PureComponent {
	static contextType = ThemeContext

	state = {
        open: false
    }

	componentDidMount() {
		this.props.loadSubscription()
	}

	onSubscribe = ()=>
		this.props.navigation.navigate('buy')
	
	onChange = ()=>
		this.props.navigation.navigate('buy', { active: true })

	onLink = ()=>
		this.setState({ open: true })

    onBrowserClose = ()=>
        this.setState({ open: false })

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
		const { subscription: { loading, plan, gateway={} } } = this.props

		if (loading)
			return null

		//no subscription
		if (!plan)
			return <Button onPress={this.onSubscribe} title={t.s('upgradeToPro')} />

		switch (gateway.name) {
			//active for the current platform
			case (Platform.OS=='ios' ? 'apple' : 'google'):
				return (
					<React.Fragment>
						<Button onPress={this.onChange} title={`${t.s('change')} ${t.s('subscription').toLowerCase()}`} />
						<Button onPress={this.onLink} title={`${t.s('cancel')} ${t.s('subscription').toLowerCase()}`} />
					</React.Fragment>
				)
		
			//any other subscription
			default:
				return <Button onPress={this.onLink} title={`${t.s('change')} ${t.s('subscription').toLowerCase()}`} />
		}
	}

	render() {
		const { subscription: { links={} } } = this.props
		const { open } = this.state

		return (
			<Wrap>
				{this.renderStatus()}

				<WebView source={{uri: 'https://raindrop.io/pro?frame=1&pro=1'}} />

				{!this.context.isExtension && this.renderButtons()}

				{open && (
					<Browser
						link={links.manage || 'https://app.raindrop.io/settings/pro'}
						browser='system'
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
			</Wrap>
		)
	}
}

export default connect(
	(state)=>({
		user: user(state),
		subscription: subscription(state)
	}),
	{ loadSubscription }
)(ProStatus)