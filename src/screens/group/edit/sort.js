import t from 't'
import React from 'react'
import { connect } from 'react-redux'
import { reorder } from 'data/actions/collections'

import Goto from 'co/common/goto'

class EditGroupSort extends React.PureComponent {
	onSortPress = ()=>{
		this.props.reorder('title')
		this.props.navigation.goBack()
	}

	render() {
		return (
            <Goto
                label={`${t.s('sortMin')} ${t.s('collectionsCount')} ${t.s('byName').toLowerCase()}`}
                onPress={this.onSortPress} />
		)
	}
}

export default connect(
	undefined,
	{ reorder }
)(EditGroupSort)