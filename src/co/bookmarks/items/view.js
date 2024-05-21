import { PureComponent } from 'react';
import _ from 'lodash-es'
import { AppState } from 'react-native'
import { SPACE_PER_PAGE } from 'data/constants/bookmarks'
import SortableFlatList from 'co/list/flat/sortable'

import Header from '../header'
import Footer from '../footer'
import EmptyState from './empty'
import { List } from './style'
import Item from '../item'

export default class SpaceItems extends PureComponent {
	state = {
		topVisible: true
	}

	//automatic reload on app focus
	componentDidMount() {
		this._appStateChange = AppState.addEventListener('change', this.onAppStateChange)
	}

	componentWillUnmount() {
		this._appStateChange && this._appStateChange.remove()
	}

	onViewableItemsChanged = ({ viewableItems=[] })=>{
		const topVisible = !viewableItems.length || (_.last(viewableItems).index < SPACE_PER_PAGE)
		if (topVisible != this.state.topVisible)
			this.setState({ topVisible })
	}

	onAppStateChange = (state)=>{
		if (state == 'active' && this.state.topVisible)
			this.props.onRefresh()
	}

	//dragging
	onSortEnd = ({ from, to })=>{
		const origin = this.props.data[from]
		const target = this.props.data[to]

		if (from == to || !origin || !target) return

		this.props.oneReorder(origin, target)
	}

	//refresh
	_needRefresh = false

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

	//rendering
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

	keyExtractor = (item) => item.toString()

	renderItem = ({ item, dragState })=>(
		<Item
			key={item}
			bookmarkId={item}
			spaceId={this.props.spaceId}
			view={this.props.collection.view}
			showActions={this.props.collection.access.level>=3}
			numColumns={this.props.numColumns}
			viewHide={this.props.viewHide}
			listCoverRight={this.props.listCoverRight}

			dragState={dragState}

			onCollectionPress={this.props.onCollectionPress}
			navigation={this.props.navigation} />
	)

	render() {
		const sortEnabled = this.props.sort=='sort' && this.props.collection.access.level>=3 && !this.props.selectModeEnabled

		return (
			<List
				as={this.props.sort=='sort' ? SortableFlatList : undefined}
				{...this.listViewParams}
				
				key={this.props.numColumns}
				data={this.props.data}
				extraData={this.props.collection.view+this.props.viewHide.join('')}
				keyExtractor={this.keyExtractor}

				renderItem={this.renderItem}
				ListHeaderComponent={this.ListHeaderComponent}
				ListFooterComponent={this.ListFooterComponent}
				ListEmptyComponent={this.ListEmptyComponent}
				
				numColumns={this.props.numColumns}
				refreshing={this._needRefresh && this.isRefreshing()}
				
				onRefresh={this.onRefresh}
				onEndReached={this.onEndReached}
				onViewableItemsChanged={this.onViewableItemsChanged}
				
				sortEnabled={sortEnabled}
				onSortEnd={this.onSortEnd} />
		)
	}
}