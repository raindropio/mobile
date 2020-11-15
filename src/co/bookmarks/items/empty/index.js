import React from 'react'
import { connect } from 'react-redux'
import { refresh } from 'data/actions/bookmarks'
import { makeStatus, getSearchEmpty } from 'data/selectors/bookmarks'

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
	() => {
		const getStatus = makeStatus()
			
		const mapStateToProps = (state, {spaceId})=>{
			return {
				status: getStatus(state, spaceId).main,
				searchEmpty: getSearchEmpty(state, spaceId)
			}
		}
	
		return mapStateToProps
	},
	{refresh}
)(SpaceEmptyContainer)