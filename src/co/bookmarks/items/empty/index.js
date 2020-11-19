import React from 'react'
import { connect } from 'react-redux'
import { refresh } from 'data/actions/bookmarks'
import { status, getSearchEmpty } from 'data/selectors/bookmarks'

import View from './view'

class SpaceEmptyContainer extends React.Component {
	onRefresh = ()=>
		this.props.refresh(this.props.spaceId)

	render() {
		return (
			<View 
				spaceId={this.props.spaceId}
				status={this.props.status}
				searchEmpty={this.props.searchEmpty}
				onRefresh={this.onRefresh}
				navigation={this.props.navigation} />
		)
	}
}

export default connect(
	(state, {spaceId})=>{
		return {
			status: status(state, spaceId).main,
			searchEmpty: getSearchEmpty(state, spaceId)
		}
	},
	{refresh}
)(SpaceEmptyContainer)