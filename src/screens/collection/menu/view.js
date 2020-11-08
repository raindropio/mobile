import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { oneChangeView } from 'data/actions/collections'

import SwitchIcon from 'co/common/switchIcon'

class CollectionView extends React.Component {
	static propTypes = {
        collection: PropTypes.object
    }
    
    view = {
        options: [
            {key: 'list', source: require('assets/images/viewList.png')},
            {key: 'grid', source: require('assets/images/viewGrid.png')},
            {key: 'simple', source: require('assets/images/viewSimple.png')}
        ],

        onChange: (view)=>
            this.props.oneChangeView(this.props.collection._id, view)
    }

	render() {
		return (
			<SwitchIcon
                last={this.props.last}
                label={t.s('view')}
                items={this.view.options}
                selected={this.props.collection.view}
                onChange={this.view.onChange} />
		)
	}
}

export default connect(
	undefined,
	{ oneChangeView }
)(CollectionView)