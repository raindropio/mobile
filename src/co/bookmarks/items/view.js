import React from 'react'
import Shadow from 'co/list/helpers/shadow'
import Header from '../header'
import Footer from '../footer'
import EmptyState from './empty'

import { List } from './style'
import Item from '../item'

export default class SpaceItems extends React.PureComponent {
	_needRefresh = false
	keyExtractor = (item) => item.toString()

	renderItem = ({ item })=>(
		<Item
			key={item}
			bookmarkId={item}
			spaceId={this.props.spaceId}
			view={this.props.collection.view}
			showActions={this.props.collection.access.level>=3}
			numColumns={this.props.numColumns}
			onCollectionPress={this.props.onCollectionPress}
			navigation={this.props.navigation} />
	)

	ListHeaderComponent = ()=>(
		<>
			{this.props.header ? (typeof this.props.header == 'function' ? this.props.header() : this.props.header) : null}
			
			<Header 
				spaceId={this.props.spaceId}
				navigation={this.props.navigation} />
		</>
	)

	ListFooterComponent = ()=>(
		<Footer spaceId={this.props.spaceId} />
	)

	ListEmptyComponent = ()=>(
		<EmptyState 
			spaceId={this.props.spaceId}
			navigation={this.props.navigation} />
	)

	onRefresh = ()=>{
		this._needRefresh=true;
		this.props.onRefresh()
	}

	onEndReached = ()=>{
		if (this.props.data.length)
			this.props.onNextPage()
	}

	isRefreshing = ()=>
		this.props.status=='idle' || this.props.status=='loading'

	render() {
		return (
			<Shadow>{onScroll=>
				<List
					{...this.listViewParams}
					
					key={this.props.numColumns}
					data={this.props.data}
					keyExtractor={this.keyExtractor}

					renderItem={this.renderItem}
					ListHeaderComponent={this.ListHeaderComponent}
					ListFooterComponent={this.ListFooterComponent}
					ListEmptyComponent={this.ListEmptyComponent}
					
					numColumns={this.props.numColumns}
					refreshing={this._needRefresh && this.isRefreshing()}

					
					onRefresh={this.onRefresh}
					onEndReached={this.onEndReached}
					onScroll={onScroll} />
			}</Shadow>
		)
	}
}