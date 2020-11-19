import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { query } from 'data/selectors/bookmarks'

import Goto from 'co/common/goto'
import { getLabel } from '../sort/options'

class CollectionSort extends React.Component {
    static propTypes = {
        collection: PropTypes.object
    }

    onSortPress = ()=>
        this.props.navigation.navigate('sort', { _id: this.props.collection._id })

	render() {
		return (
			<Goto
                last={this.props.last}
                label={t.s('sortBy')}
                icon={this.props.sort.startsWith('-') ? 'sort-desc' : 'sort-asc'}
                subLabel={getLabel(this.props.sort)}
                onPress={this.onSortPress} />
		)
	}
}

export default connect(
	(state, { collection })=>{
        return {
            sort:   query(state, collection._id).sort,
        }
    }
)(CollectionSort)