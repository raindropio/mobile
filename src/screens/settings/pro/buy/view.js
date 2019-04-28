import React from 'react'
import {Alert} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'
import { isPro, user } from 'data/selectors/user'

import { getPeriods, buyId } from './module'
import Form from './form'

const getErrorString = (e)=>{
	if (typeof e == 'string')
		return e

	if (typeof e == 'object')
		if (e.message)
			return e.message.toString()

	return e.toString()
}

class ProBuyContainer extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			periods: [],
			loading: true
		}
	}

	componentDidMount() {
		getPeriods().then((periods)=>{
			this.setState({
				periods,
				loading: false
			})
		}).catch((errorMessage='')=>{
			Alert.alert(getErrorString(errorMessage))
			this.setState({
				periods:[],
				loading: false
			})
		})
	}

	onSelect = (id)=>{
		this.setState({loading: true})

		buyId(id)
			.then(()=>{
				this.props.actions.user.refresh()
				this.props.onClose()
			})
			.catch((e='')=>{
				Alert.alert(getErrorString(e))
				this.setState({loading: false})
			})
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