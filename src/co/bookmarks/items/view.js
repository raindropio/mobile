import { useState, useRef, useEffect } from 'react'
import _ from 'lodash-es'
import { AppState } from 'react-native'
import { SPACE_PER_PAGE } from 'data/constants/bookmarks'
import SortableFlatList from 'co/list/flat/sortable'

import Header from '../header'
import Footer from '../footer'
import EmptyState from './empty'
import { List } from './style'
import Item from '../item'

const keyExtractor = item=>item.toString()

export default function SpaceItems({
	spaceId, header, onCollectionPress, navigation,
	status, collection, data, selectModeEnabled, sort, viewHide, listCoverRight, numColumns,
	onRefresh, onNextPage, onReorder
}) {
	const topVisible = useRef(true)
	const [pulled, setPulled] = useState(false)

	//automatic reload on app focus
	useEffect(()=>{
		const sub = AppState.addEventListener('change', state=>{
			if (state == 'active' && topVisible.current)
				onRefresh()
		})
		return ()=>sub.remove()
	}, [onRefresh])

	const onViewableItemsChanged = ({ viewableItems=[] })=>{
		topVisible.current = !viewableItems.length || (_.last(viewableItems).index < SPACE_PER_PAGE)
	}

	//dragging
	const onSortEnd = ({ from, to })=>{
		const origin = data[from]
		const target = data[to]

		if (from == to || !origin || !target) return

		onReorder(origin, target)
	}

	//refresh
	const refresh = ()=>{
		setPulled(true)
		onRefresh()
	}

	const onEndReached = ()=>{
		if (data.length)
			onNextPage()
	}

	const isRefreshing = status=='idle' || status=='loading'

	//rendering
	const listHeader = (
		<>
			{header ? (typeof header == 'function' ? header() : header) : null}
			
			<Header 
				spaceId={spaceId}
				navigation={navigation} />
		</>
	)

	const listFooter = (
		<Footer spaceId={spaceId} />
	)

	const listEmpty = (
		<EmptyState 
			spaceId={spaceId}
			navigation={navigation} />
	)

	const renderItem = ({ item, dragState })=>(
		<Item
			key={item}
			bookmarkId={item}
			spaceId={spaceId}
			view={collection.view}
			showActions={collection.access.level>=3}
			numColumns={numColumns}
			viewHide={viewHide}
			listCoverRight={listCoverRight}

			dragState={dragState}

			onCollectionPress={onCollectionPress}
			navigation={navigation} />
	)

	const sortEnabled = sort=='sort' && collection.access.level>=3 && !selectModeEnabled

	return (
		<List
			as={sort=='sort' ? SortableFlatList : undefined}
			
			key={numColumns}
			data={data}
			extraData={collection.view+viewHide.join('')}
			keyExtractor={keyExtractor}

			renderItem={renderItem}
			ListHeaderComponent={listHeader}
			ListFooterComponent={listFooter}
			ListEmptyComponent={listEmpty}
			
			numColumns={numColumns}
			refreshing={pulled && isRefreshing}
			
			onRefresh={refresh}
			onEndReached={onEndReached}
			onViewableItemsChanged={onViewableItemsChanged}
			
			sortEnabled={sortEnabled}
			onSortEnd={onSortEnd} />
	)
}