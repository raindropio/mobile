import React from 'react'
import t from 't'
import {
	ScrollForm
} from 'co/style/form'

import Login from './login'
import Register from './register'
import Tabs from 'co/common/tabs'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'

import { userStatus, errorReason } from 'data/selectors/user'

const tabs = [{
	key: 'login',
	title: t.s('signIn')
}, {
	key: 'register',
	title: t.s('signUp')
}]

class AuthEmail extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tab: 'register'
		}
	}

	onChangeTab = (tab)=>{
		this.setState({tab})
	}

	onLogin = (params)=>{
		this.props.actions.user.loginWithPassword(params)
	}

	onRegister = (params)=>{
		this.props.actions.user.registerWithPassword(params)
	}

	render() {
		const { userStatus, errorReason, componentId } = this.props

		return (
			<ScrollForm stickyHeaderIndices={[0]}>
				<Tabs items={tabs} active={this.state.tab} onChange={this.onChangeTab} />
				{this.state.tab=='login' ? <Login status={userStatus.login} componentId={componentId} onSubmit={this.onLogin} /> : null}
				{this.state.tab=='register' ? <Register status={userStatus.register} error={errorReason.register} componentId={componentId} onSubmit={this.onRegister} /> : null}
			</ScrollForm>
		)
	}
}

export default connect(
	(state)=>{
		return {
			userStatus: userStatus(state),
			errorReason: errorReason(state)
		}
	},
	(dispatch)=>({
		actions: {
			user: bindActionCreators(userActions, dispatch)
		}
	})
)(AuthEmail)