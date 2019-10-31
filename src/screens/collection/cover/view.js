import React from 'react'

import { connect } from 'react-redux'
import * as actions from 'data/actions/covers'

import Form from './form'

class PickCoverContainer extends React.Component {
	componentDidMount() {
		this.props.load(this.props.query)	
	}

	render() {
		return <Form {...this.props} />
	}
}

export default connect(
	(state)=>state.covers,
	actions
)(PickCoverContainer)