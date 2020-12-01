import t from 't'
import React from 'react'
import { connect } from 'react-redux'
import { groupRemove } from 'data/actions/collections'
import { group } from 'data/selectors/collections'

import Warning from 'co/alert/warning'
import Button from 'co/button'

class EditGroupRemove extends React.PureComponent {
	state = {
		showWarning: false
	}

	onRemovePress = ()=>{
		if (this.props.collections.length)
			return this.setState({ showWarning: true })
		else
			return this.props.groupRemove(this.props._id, this.props.navigation.goBack)
	}

	render() {
		if (this.state.showWarning)
			return (
				<Warning message={t.s('removeGroupError')} />
			)

		return (
			<Button 
				color='danger' 
				onPress={this.onRemovePress}
				title={`${t.s('remove')} ${t.s('group').toLowerCase()}`} />
		)
	}
}

export default connect(
	(state, { _id })=>
		group(state, _id),
	{ groupRemove }
)(EditGroupRemove)