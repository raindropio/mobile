import React from 'react'
import { Dimensions } from 'react-native'
import Shadow from 'co/list/helpers/shadow'
import { easeInOut } from 'co/style/animation'

import Footer from '../footer'
import EmptyState from './empty'
import { Wrap, List } from './style'
import Item from '../item'

let _prevWidth = Dimensions.get('window').width

function getColumns(view, width) {
	let numColumns = 1

	switch(view) {
		case 'grid':
		case 'masonry':
			numColumns = parseInt(width / 185)
			if (numColumns<2) numColumns = 2
		break
	}

	return numColumns
}

export default class SpaceItems extends React.PureComponent {
	state = {
		numColumns: getColumns(this.props.collection.view, _prevWidth)
	}

	_needRefresh = false
	keyExtractor = (item) => item.toString()

	renderItem = ({ item })=>(
		<Item
			key={item}
			bookmarkId={item}
			spaceId={this.props.spaceId}
			view={this.props.collection.view}
			showActions={this.props.collection.access.level>=3}
			onCollectionPress={this.props.onCollectionPress}
			navigation={this.props.navigation} />
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

	onLayout = ({ nativeEvent: { layout: { width } } })=>{
		if (_prevWidth === width) return

		_prevWidth = width
		const numColumns = getColumns(this.props.collection.view, width)

		if (numColumns != this.state.numColumns){
			easeInOut()
			this.setState({ numColumns })
		}
	}

	isRefreshing = ()=>
		this.props.status=='idle' || this.props.status=='loading'

	render() {
		return (
			<Wrap onLayout={this.onLayout}>
				<Shadow>{onScroll=>
					<List
						{...this.listViewParams}
						
						key={this.state.numColumns}
						data={this.props.data}
						keyExtractor={this.keyExtractor}

						renderItem={this.renderItem}
						ListHeaderComponent={this.props.header}
						ListFooterComponent={this.ListFooterComponent}
						ListEmptyComponent={this.ListEmptyComponent}
						
						numColumns={this.state.numColumns}
						refreshing={this._needRefresh && this.isRefreshing()}

						
						onRefresh={this.onRefresh}
						onEndReached={this.onEndReached}
						onScroll={onScroll} />
				}</Shadow>
			</Wrap>
		)
	}
}