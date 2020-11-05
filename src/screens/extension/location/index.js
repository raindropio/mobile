import React from 'react'
import PropTypes from 'prop-types'
import t from 't'

import TreeContainer from 'co/collections/items'

class ExtensionLocation extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
                overrideTitle:  PropTypes.string,
                type:			PropTypes.string,
				values:			PropTypes.array
			})
		})
	}

	static options = ({ route: { params={} } })=>({
		animationEnabled: false,
		title: params.overrideTitle || t.s('newBookmark'),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
    })

	treeOptions = {
        hideIds: [-99]
    }

	onItemTap = ({ _id })=>
        this.props.navigation.replace('save', {
            ...this.props.route.params,
            collectionId: _id,
        })

	render() {			
		return (
			<TreeContainer 
				options={this.treeOptions}
				searchAutoFocus
				onItemTap={this.onItemTap} />
		)
	}
}

export default ExtensionLocation