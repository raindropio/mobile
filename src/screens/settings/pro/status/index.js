import React from 'react'
import { connect } from 'react-redux'
import { loadSubscription } from 'data/actions/user'
import { user, subscription } from 'data/selectors/user'

import Browser from 'co/navigation/browser'
import Form from './form'

class ProStatusContainer extends React.PureComponent {
	state = {
        open: false
    }

	componentDidMount() {
		this.props.loadSubscription()
	}

	onSubscribe = ()=>
		this.props.navigation.navigate('pro/buy')
	
	onChange = ()=>
		this.props.navigation.navigate('pro/buy', { active: true })

	onLink = ()=>
		this.setState({ open: true })

    onBrowserClose = ()=>
        this.setState({ open: false })

	render() {
		return (
			<>
				<Form 
					key='from'
					user={this.props.user}
					subscription={this.props.subscription}
					onSubscribe={this.onSubscribe}
					onChange={this.onChange}
					onLink={this.onLink} />

				{this.state.open && (
					<Browser
						link={this.props.subscription.links.manage || 'https://app.raindrop.io/settings/pro?frame=1'}
						browser='system'
                        fromBottom
						onClose={this.onBrowserClose} />
				)}
			</>
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