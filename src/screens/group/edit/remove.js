import t from 't'
import React from 'react'
import { connect } from 'react-redux'
import { groupRemove } from 'data/actions/collections'
import { group } from 'data/selectors/collections'

import Warning from 'co/common/alert/warning'
import { ButtonLink } from 'co/common/button'

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
			<ButtonLink danger onPress={this.onRemovePress}>
                {t.s('remove')} {t.s('group').toLowerCase()}
            </ButtonLink>
		)
	}
}

export default connect(
	(state, { _id })=>
		group(state, _id),
	{ groupRemove }
)(EditGroupRemove)