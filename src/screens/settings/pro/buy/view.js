import t from 't'
import React from 'react'
import { Alert, Platform } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'
import { isPro, user } from 'data/selectors/user'

import { getProducts, buyProduct, validatePurchase, subscribeToPurchase, closeConnection } from './module'
import Form from './form'

class ProBuyContainer extends React.PureComponent {
	state = {
		periods: [],
		loading: true
	}

	async componentDidMount() {
		this.props.actions.user.refresh()

		try{
			this.setState({
				periods: await getProducts(),
				loading: false
			})
		} catch (e) {
			Alert.alert(e.code||'error', e.message)
		}
	}

	async componentWillUnmount() {
		await closeConnection()
	}

	onSelect = async (id)=>{
		this.setState({loading: true})

		try{
			const purchase = await buyProduct(id)
			await this.onPurchase(purchase)
		} catch(e) {
			this.setState({loading: false})

			switch(e.code||'') {
				case 'E_USER_CANCELLED':
				break;
				
				default:
					Alert.alert(e.code||'error', e.message)

					//ios only: add listener, so if any other purchase is processed in background validate it
					try{this._additionalEvent.remove()}catch(e){}
					this._additionalEvent = subscribeToPurchase(this.onPurchase)
				break
			}
		}
	}

	onPurchase = async (purchase)=>{
		try{this._additionalEvent.remove()}catch(e){}

		try{
			await validatePurchase(purchase, this.props.user._id)
			this.props.actions.user.refresh()
			this.props.onClose()

			Alert.alert(t.s('upgradeToPro'), `OK`)
		} catch(e) {
			this.setState({loading: false})
			Alert.alert(`Error can't validate purchase`, `We already aware of this problem, but just in case please send email to info@raindrop.io with purchase details that you received on email from ${Platform.OS=='ios'?'Apple':'Google'}!`)
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