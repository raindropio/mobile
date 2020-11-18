import React from 'react'
import DropView from 'co/common/ipad/DropView'
import Items from './view'
import SelectMode from '../selectMode'
import withNavigation from 'co/navigation/withNavigation'

import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { makeBookmarksIds, makeStatus } from 'data/selectors/bookmarks'

const wrapStyle = {flex:1}

class SpaceContainer extends React.Component {
	static defaultProps = {
		spaceId: 0,
		header: undefined,

		onCollectionPress: undefined,
		onSystemDrop: undefined
	}

	onRefresh = ()=>{
		this.props.refresh(this.props.spaceId)
	}

	onNextPage = ()=>{
		this.props.nextPage(this.props.spaceId)
	}

	render() {
		return (
			<>
				<DropView onDrop={this.props.onSystemDrop} style={wrapStyle}>
					<Items 
						{...this.props}
						onRefresh={this.onRefresh}
						onNextPage={this.onNextPage} />
				</DropView>

				<SelectMode 
					spaceId={this.props.spaceId}
					navigation={this.props.navigation} />
			</>
		)
	}
}

export default connect(
	() => {
		const getCollection = makeCollection()
		const getIds = makeBookmarksIds()
		const getStatus = makeStatus()
	
		return (state, { spaceId })=>({
			status: 			getStatus(state, spaceId).main,
			collection: 		getCollection(state, spaceId),
			data:				getIds(state, spaceId)
		})
	},
	{
		refresh: require('data/actions/bookmarks').refresh,
		nextPage: require('data/actions/bookmarks').nextPage
	}
)(withNavigation(SpaceContainer))