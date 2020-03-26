import React from 'react'
import { SafeAreaView, Platform } from 'react-native'
import Navigation from 'modules/navigation'
import DropView from 'co/common/iPadDropView'
import Items from './view'
import Toolbar from '../toolbar'

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
	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }
	
	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'search':
				Navigation[Platform.isPad ? 'push' : 'showModal'](this.props, 'bookmarks/search', {spaceId: this.props.spaceId+'s'})
			break

			case 'add':
				Navigation.showModal(this.props, 'bookmark/add/home', {collectionId: this.props.collection._id||-1})
			break
		}
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
						componentId={this.props.componentId} />
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
)(SpaceContainer)