import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { makeSort } from 'data/selectors/bookmarks'

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
                subLabel={getLabel(this.props.sort)}
                onPress={this.onSortPress} />
		)
	}
}

export default connect(
	() => {
        const getSort = makeSort()
    
        return (state, { collection })=>{
            return {
                sort:   getSort(state, collection._id),
            }
        }
    }
)(CollectionSort)