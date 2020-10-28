import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import { plan } from 'modules/format/subscription'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'
import { user, subscription } from 'data/selectors/user'

import Form from './form'

class ProStatusContainer extends React.PureComponent {
	componentDidMount() {
		this.updateTitle()
		this.props.actions.user.loadSubscription()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.subscription != this.props.subscription)
			this.updateTitle()
	}

	updateTitle = ()=>{
		Navigation.mergeOptions(this.props, {
			topBar: {
				title: {
					text: t.s('upgradeAccount'),
				},
				...this.props.subscription.plan ? {
					subtitle: {
						text: plan(this.props.subscription)+' '+t.s('subscription').toLowerCase()
					}
				} : {}
			}
		})
	}

	onSubscribe = ()=>{
		Navigation.push(this.props, 'settings/pro/buy')
	}

	onChange = ()=>{
		Navigation.push(this.props, 'settings/pro/buy', { active: true })
	}

	onLink = ()=>{
		const link = this.props.subscription.links.manage

		if (!link)
			Navigation.push(this.props, 'misc/browser', {
				link: 'https://app.raindrop.io/settings/pro?frame=1'
			})
		else
			Navigation.openURL(this.props, {
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
	(dispatch)=>({
		actions: {
			user: bindActionCreators(userActions, dispatch)
		}
	})
)(ProStatusContainer)