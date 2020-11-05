import React from 'react'
import PropTypes from 'prop-types'
import t from 't'

import TreeContainer from 'co/collections/items'

class CollectionPathScreen extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:		PropTypes.number,
				parentId:	PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number
				]),
				onSelect:	PropTypes.func
			})
		})
	}

	static options = {
		title: t.s('collection') + ' ' + t.s('location').toLowerCase(),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
    }

	treeOptions = {
        hideIds: [this.props.route.params._id, -1, -99]
    }

	onItemTap = ({ _id })=>{
        this.props.route.params.onSelect(_id)
		this.props.navigation.goBack()
	}

	render() {
		const { route: { params={} } } = this.props
			
		return (
			<TreeContainer 
				selectedId={params.parentId}
				options={this.treeOptions}
				searchAutoFocus
				groupSelectable
				onItemTap={this.onItemTap} />
		)
	}
}

export default CollectionPathScreen