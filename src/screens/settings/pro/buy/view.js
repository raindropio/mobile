import t from 't'
import React from 'react'
import { Alert, Platform } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'
import { user, subscription } from 'data/selectors/user'

import { Error } from 'co/overlay'
import { init, getProducts, subscribe, restore, finish, purchaseUpdatedListener, purchaseErrorListener } from './module'
import Form from './form'

class ProBuyContainer extends React.PureComponent {
	state = {
		periods: [],
		loading: true
	}

	async componentDidMount() {
		this.props.actions.user.refresh()
		this.props.actions.user.loadSubscription()

		try{
			await init()

			this.setState({
				periods: await getProducts(),
				loading: false
			})
		} catch (e) {
			Error(e)
		}

		this.purchaseUpdatedListener = purchaseUpdatedListener(this.onPurchase)
		this.purchaseErrorListener = purchaseErrorListener(this.onError)
	}

	componentWillUnmount() {
		this.purchaseUpdatedListener && this.purchaseUpdatedListener.remove()
		this.purchaseErrorListener && this.purchaseErrorListener.remove()
	}

	onSelect = async (id)=>{
		this.setState({loading: true})

		try{
			await subscribe(id, this.props.subscription, this.props.user._id)
		} catch(e) {
			this.setState({loading: false})
			this.onError(e)
		}
	}

	onPurchase = async (purchase)=>{
		try{
			await finish(purchase, this.props.user._id)
			await this.onSuccess()
		} catch(e) {
			this.setState({loading: false})
			this.onError(e)
		}
	}

	onSuccess = async()=>{
		this.props.actions.user.refresh()
		this.props.actions.user.loadSubscription()
		this.props.onClose()

		Alert.alert(t.s('upgradeToPro'), `OK`)
	}

	onRestore = async()=>{
		this.setState({loading: true})

		if (await restore(this.props.user._id))
			await this.onSuccess()

		this.setState({loading: false})
	}

	onError = (e)=>{
		console.log(e)

		switch(e.code) {
			case 'E_USER_CANCELLED':
			case 'E_ALREADY_OWNED':
			break;
			
			default:
				Alert.alert(`${e.code || e.responseCode}: ${e.debugMessage}`, `${e.message}\nWe already aware of this problem, but just in case please send email to info@raindrop.io with purchase details that you received on email from ${Platform.OS=='ios'?'Apple':'Google'}!`)
			break
		}
	}

	render() {
		return (
			<Form 
				active={this.props.subscription.plan}
				periods={this.state.periods}
				loading={this.state.loading}
				onSelect={this.onSelect}
				onRestore={this.onRestore}
				onClose={this.props.onClose} />
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
)(ProBuyContainer)