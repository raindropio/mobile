import React from 'react'
import { SafeAreaView } from 'react-native'
import DropView from 'co/common/ipad/DropView'
import Items from './view'
import Toolbar from '../toolbar'
import withNavigation from 'co/navigation/withNavigation'

import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'
import {
	makeBookmarksIds,
	makeBookmarksWithSections,
	makeBookmarksWithSectionsBlocked,
	makeStatusMain,
	makeSort
} from 'data/selectors/bookmarks'

const 
	wrapStyle = {flex:1}

class SpaceContainer extends React.Component {
	static defaultProps = {
		spaceId: 0,

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
			<DropView onDrop={this.props.onSystemDrop} style={wrapStyle}>
				<SafeAreaView style={wrapStyle}>
					<Items 
						{...this.props}
						onRefresh={this.onRefresh}
						onNextPage={this.onNextPage} />

					<Toolbar 
						spaceId={this.props.spaceId}
						navigation={this.props.navigation} />
				</SafeAreaView>
			</DropView>
		)
	}
}

export default connect(
	() => {
		const 
			getIds = makeBookmarksIds(),
			getSections = makeBookmarksWithSections(),
			getSectionsBlocked = makeBookmarksWithSectionsBlocked(),
			getStatusMain = makeStatusMain(),
			getSort = makeSort()
	
		return (state, {spaceId})=>{
			const currentCollection = collection(state, parseInt(spaceId))
			const sort = getSort(state, spaceId)

			let data
			let flat = false

			switch(currentCollection.view){
				//todo: support grid/masonry layout for non-section list
				case 'grid':
				case 'masonry':
					data = getSectionsBlocked(state, spaceId)
				break
	
				default:
					if (sort.endsWith('sort')){
						data = getIds(state, spaceId)
						flat = true
					}
					else
						data = getSections(state, spaceId)
				break
			}
			
			return {
				status: 			getStatusMain(state, spaceId),
				collection: 		currentCollection,
				data,
				flat
			}
		}
	},
	{
		refresh: require('data/actions/bookmarks').refresh,
		nextPage: require('data/actions/bookmarks').nextPage
	}
)(withNavigation(SpaceContainer))