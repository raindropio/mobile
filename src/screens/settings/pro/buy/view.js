import t from 't'
import React from 'react'
import { Alert, Platform } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'
import { isPro, user } from 'data/selectors/user'

import { init, getProducts, buyProduct, validatePurchase, purchaseUpdatedListener, purchaseErrorListener } from './module'
import Form from './form'

class ProBuyContainer extends React.PureComponent {
	state = {
		periods: [],
		loading: true
	}

	async componentDidMount() {
		this.props.actions.user.refresh()

		try{
			await init(this.props.user._id)

			this.setState({
				periods: await getProducts(),
				loading: false
			})
		} catch (e) {
			Alert.alert(e.code||'error', e.message)
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
			await buyProduct(id)
		} catch(e) {
			this.setState({loading: false})
			this.onError(e)
		}
	}

	onPurchase = async (purchase)=>{
		try{
			await validatePurchase(purchase, this.props.user._id)
			this.props.actions.user.refresh()
			this.props.onClose()

			Alert.alert(t.s('upgradeToPro'), `OK`)
		} catch(e) {
			this.setState({loading: false})
			this.onError(e)
		}
	}

	onError = (e)=>{
		console.log(e)

		switch(e.code) {
			case 'E_USER_CANCELLED':
			break;
			
			default:
				Alert.alert(`${e.code || e.responseCode}: ${e.debugMessage}`, `${e.message}\nWe already aware of this problem, but just in case please send email to info@raindrop.io with purchase details that you received on email from ${Platform.OS=='ios'?'Apple':'Google'}!`)
			break
		}
	}

	render() {
		return (
			<Form 
				isPro={this.props.isPro}
				periods={this.state.periods}
				loading={this.state.loading}
				onSelect={this.onSelect}
				onClose={this.props.onClose} />
		)
	}
}

export default connect(
	(state)=>({
		user: user(state),
		isPro: isPro(state)
	}),
	(dispatch)=>({
		actions: {
			user: bindActionCreators(userActions, dispatch)
		}
	})
)(ProBuyContainer)