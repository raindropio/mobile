import React from 'react'
import { SafeAreaView, Platform } from 'react-native'
import Navigation from 'modules/navigation'
import Items from './view'
import Toolbar from '../toolbar'

import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'
import {
	makeBookmarksWithSections,
	makeBookmarksWithSectionsBlocked,
	makeStatusMain
} from 'data/selectors/bookmarks'

const 
	wrapStyle = {flex:1}

class SpaceContainer extends React.PureComponent {
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
			<SafeAreaView style={wrapStyle}>
				<Items 
					spaceId={this.props.spaceId}

					collection={this.props.collection}
					data={this.props.data}
					status={this.props.status}
					componentId={this.props.componentId}
					showCollectionPath={this.props.collection._id==0}
					hideHead={this.props.hideHead}

					onRefresh={this.onRefresh}
					onNextPage={this.onNextPage} />

				<Toolbar 
					spaceId={this.props.spaceId}
					componentId={this.props.componentId} />
			</SafeAreaView>
		)
	}
}

export default connect(
	() => {
		const 
			getSections = makeBookmarksWithSections(),
			getSectionsBlocked = makeBookmarksWithSectionsBlocked(),
			getStatusMain = makeStatusMain()
	
		return (state, {spaceId})=>{
			const currentCollection = collection(state, spaceId)
			let data
	
			switch(currentCollection.view){
				case 'grid':
				case 'masonry':
					data = getSectionsBlocked(state, spaceId)
				break
	
				default:
					data = getSections(state, spaceId)
				break
			}
			
			return {
				status: 			getStatusMain(state, spaceId),
				collection: 		currentCollection,
				data: 				data
			}
		}
	},
	{
		refresh: require('data/actions/bookmarks').refresh,
		nextPage: require('data/actions/bookmarks').nextPage
	}
)(SpaceContainer)