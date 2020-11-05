import React from 'react'
import { openURL } from 'modules/browser'

import { connect } from 'react-redux'
import { loadSubscription } from 'data/actions/user'
import { user, subscription } from 'data/selectors/user'

import Form from './form'

class ProStatusContainer extends React.PureComponent {
	componentDidMount() {
		this.props.loadSubscription()
	}

	onSubscribe = ()=>
		this.props.navigation.navigate('pro/buy')
	
	onChange = ()=>
		this.props.navigation.navigate('pro/buy', { active: true })

	onLink = ()=>{
		const link = this.props.subscription.links.manage

		if (!link)
			openURL({
				browser: 'system',
				link: 'https://app.raindrop.io/settings/pro?frame=1'
			})
		else
			openURL({
				browser: 'system',
				link
			})
	}

	render() {
		return (
			<Form 
				key='from'
				user={this.props.user}
				subscription={this.props.subscription}
				onSubscribe={this.onSubscribe}
				onChange={this.onChange}
				onLink={this.onLink} />
		)
	}
}

export default connect(
	(state)=>({
		user: user(state),
		subscription: subscription(state)
	}),
	{ loadSubscription }
)(ProStatusContainer)