import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startSelectMode } from 'data/actions/bookmarks'

import Goto from 'co/common/goto'

class CollectionSelectMode extends React.Component {
	static propTypes = {
        collection: PropTypes.object
    }

    onSelectModePress = ()=>{
        this.props.startSelectMode(this.props.collection._id)
        this.props.navigation.goBack()
    }

	render() {
		return (
			<Goto
                last={this.props.last}
                label={t.s('helpBatch')}
                onPress={this.onSelectModePress} />
		)
	}
}

export default connect(
	undefined,
	{ startSelectMode }
)(CollectionSelectMode)