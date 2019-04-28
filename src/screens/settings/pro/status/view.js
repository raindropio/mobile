import React from 'react'
import Navigation from 'modules/navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'
import { isPro, user } from 'data/selectors/user'

import Form from './form'

import { until } from 'modules/format/date'

class ProStatusContainer extends React.PureComponent {
	componentDidMount() {
		this.updateTitle(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.updateTitle(nextProps)
	}

	updateTitle = (props)=>{
		Navigation.mergeOptions(this.props, {
			subtitle: {
				text: props.isPro ? until(props.user.proExpire) : undefined
			}
		})
	}

	onBuy = ()=>{
		Navigation.push(this.props, 'settings/pro/buy', {
			isPro: this.props.isPro
		})
	}

	render() {
		return (
			<Form 
				key='from'
				user={this.props.user}
				isPro={this.props.isPro}
				onBuy={this.onBuy} />
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
)(ProStatusContainer)