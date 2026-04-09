import { Component } from 'react';
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { bookmarksIds, status, makeViewHide, makeSort, selectModeEnabled } from 'data/selectors/bookmarks'

import Columns from './columns'
import Items from './view'
import SelectMode from '../selectMode'
import withNavigation from 'co/navigation/withNavigation'

class SpaceContainer extends Component {
	static defaultProps = {
		spaceId: 0,
		header: undefined,

		onCollectionPress: undefined,
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
				<Columns view={this.props.collection.view}>{numColumns=>
					<Items
						{...this.props}
						numColumns={numColumns}
						onRefresh={this.onRefresh}
						onNextPage={this.onNextPage} />
				}</Columns>

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
		const getViewHide = makeViewHide()
		const getSort = makeSort()
	
		return (state, { spaceId })=>({
			status: 			status(state, spaceId).main,
			collection: 		getCollection(state, spaceId),
			data:				bookmarksIds(state, spaceId),
			selectModeEnabled:	selectModeEnabled(state, spaceId),

			sort:				getSort(state, spaceId),
			viewHide:			getViewHide(state, spaceId),
			listCoverRight:		state.config.raindrops_list_cover_right,
		})
	},
	{
		refresh: require('data/actions/bookmarks').refresh,
		nextPage: require('data/actions/bookmarks').nextPage,
		oneReorder: require('data/actions/bookmarks').oneReorder,
	}
)(withNavigation(SpaceContainer))