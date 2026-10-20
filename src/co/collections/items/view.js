import t from 't'
import { useRef, useMemo, useEffect, useEffectEvent } from 'react'
import _ from 'lodash-es'
import { AppState } from 'react-native'
import { PropTypes } from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { load, refresh, groupRemove, groupToggle, groupReorder, oneToggle, changeDefaults, oneReorder, expandTo } from 'data/actions/collections'
import { makeTreeFlat, makeCollectionsStatus } from 'data/selectors/collections'

import ItemContainer from 'co/collections/item'
import GroupContainer from 'co/collections/group'
import Empty from './empty'
import { Footer } from './style'
import FoundSection from './found'

//size
import FlatList from 'co/list/flat/basic'
import SortableFlatList from 'co/list/flat/sortable'
import { getListViewParams } from 'modules/view'
import size from 'modules/appearance/size'

const listViewParams = getListViewParams(size.height.item)

const getItemLayout = (data, index) => ({
	length: size.height.item,
	offset: size.height.item * index,
	index
})

const onScrollToIndexFailed = ()=>{}

export default function CollectionsItemsView(props) {
	const {
		treeProps,
		disableVirtualization,
		customRows,
		customRowRenderer,
		customRowKeyExtractor,
		header,
		SearchComponent,
		onItemPress,
		selectedId,
		groupSelectable,
		showEmptyState,
		snapToOffsets,
		contentOffset,
		navigation
	} = props

	const dispatch = useDispatch()

	const getTree = useMemo(()=>makeTreeFlat(), [])
	const getCollectionsStatus = useMemo(()=>makeCollectionsStatus(), [])

	const data = useSelector(state=>getTree(state, treeProps))
	const status = useSelector(state=>getCollectionsStatus(state))

	const sortable = useRef(null)
	const viewableItems = useRef([])
	const prevSelectedId = useRef(selectedId)

	//scrolling
	const scrollToSelected = useEffectEvent(()=>{
		const { current } = sortable

		if (!current) return

		//expand to selected item
		dispatch(expandTo(selectedId))

		const index = data.findIndex(({item})=>item && item._id == selectedId)

		if (index > 0 && index < data.length-1){
			//prevent scroll when item is visible
			if (viewableItems.current.find(item=>item.index==index))
				return

			current.scrollToIndex({
				index,
				animated: true,
				viewPosition: .5
			})
		}
	})

	useEffect(()=>{
		dispatch(changeDefaults({
			items: [
				{_id: 0, title: t.s('allBookmarks')},
				{_id: -1, title: t.s('defaultCollection--1')},
				{_id: -99, title: t.s('defaultCollection--99')}//, color: '#8791A1'
			],
			groupTitle: _.capitalize(t.s('collectionsCount'))
		}))

		dispatch(load())

		const appStateChange = AppState.addEventListener('change', state=>{
			if (state == 'active')
				dispatch(load())
		})

		scrollToSelected()

		return ()=>appStateChange.remove()
	}, [dispatch])

	useEffect(()=>{
		if (prevSelectedId.current == selectedId) return
		prevSelectedId.current = selectedId

		const timer = setTimeout(scrollToSelected, 100)
		return ()=>clearTimeout(timer)
	}, [selectedId])

	const onViewableItemsChanged = ({viewableItems: items})=>
		viewableItems.current = items

	const onRefresh = ()=>dispatch(refresh())
	const onToggle = _id=>dispatch(oneToggle(_id))
	const onGroupToggle = _id=>dispatch(groupToggle(_id))
	const onGroupRemove = _id=>dispatch(groupRemove(_id))

	//dragging
	const onDragStart = ({ item })=>{
		if (item?.type == 'collection' && item.item.expanded)
			dispatch(oneToggle(item.item._id))
	}

	const itemIsSortable = ({ item })=>{
		if (item.type == 'collection'){
			if (!item.item.access || !item.item.access.draggable)
				return false

			return true
		}

		if (item.type == 'group')
			return true

		return false
	}

	const onSortEnd = ({ from, to })=>{
		const origin = data[from]
		const target = data[to]

		if (from == to || !origin || !target) return

		switch (origin.type) {
			case 'collection':{
				if (target.type == 'collection'){
					if (to >= from)
						dispatch(oneReorder(origin.item._id, { after: target.item._id }))
					else if (to <= from)
						dispatch(oneReorder(origin.item._id, { before: target.item._id }))
				}
				else {
					//to end of previous group
					if (to < from &&
						data[to-1]){
						const prev = data[to-1]

						dispatch(oneReorder(
							origin.item._id,
							prev.item ?
								{ after: data[to-1].item._id } :
								{ to: prev._id }
						))
					}
					//to start of current group
					else
						dispatch(oneReorder(origin.item._id, { to: target.item ? target.item._id : target._id }))
				}
			}break

			case 'group':{
				let after, before

				if (to > from) {
					if (target.type == 'group')
						after = target._id
					else
						for(let i=to-1; i>0; i--)
							if (data[i].type=='group'){
								after=data[i]._id
								break
							}
				} else if (to < from) {
					if (target.type == 'group')
						before = target._id
					else
						for(let i=to+1; i<data.length; i++)
							if (data[i].type=='group'){
								before=data[i]._id
								break
							}
				}

				if (after || before)
					dispatch(groupReorder(origin._id, { after, before }))
			}break
		}
	}

	//items itself
	const renderItem = (params)=>{
		const { item: row, dragState } = params

		switch (row.type) {
			case 'collection':
				return (
					<ItemContainer
						{...row}
						dragState={dragState}
						selected={selectedId == row.item._id}
						onItemPress={onItemPress}
						onToggle={onToggle}
						navigation={navigation} />
				)

			case 'group':
				return (
					<GroupContainer
						{...row}
						status={status}
						dragState={dragState}
						selectable={groupSelectable}
						selected={groupSelectable && (selectedId == row._id)}
						navigation={navigation}
						onItemPress={onItemPress}
						groupToggle={onGroupToggle}
						groupRemove={onGroupRemove} />
				)

			default:
				if (customRowRenderer)
					return customRowRenderer(params)
				else
					return null
		}
	}

	const keyExtractor = (row)=>{
		if (!row) return null

		switch(row.type){
			case 'collection':
				return String(row.item._id)

			case 'group':
				return String(row._id)

			default:
				if (customRowKeyExtractor)
					return customRowKeyExtractor(row)
				else
					return null
		}
	}

	const renderHeader = ()=>(
		<>
			{header ? (typeof header == 'function' ? header() : header) : null}

			{SearchComponent ? SearchComponent : null}
			<FoundSection data={data} treeProps={treeProps} />
		</>
	)

	if (showEmptyState && status=='empty')
		return (
			<Empty
				{...props}
				status={status}
				onRefresh={onRefresh} />
		)

	//sortableFlatList is bad to be embeded so this line fix this
	const Component = disableVirtualization ? FlatList : SortableFlatList

	return (
		<Component
			{...listViewParams}

			ref={sortable}
			data={customRows ? [...data, ...customRows] : data}
			extraData={selectedId}
			keyExtractor={keyExtractor}

			disableVirtualization={disableVirtualization}
			getItemLayout={getItemLayout}

			renderItem={renderItem}
			ListHeaderComponent={renderHeader()}
			ListFooterComponent={disableVirtualization ? undefined : Footer}

			snapToOffsets={snapToOffsets}
			contentOffset={contentOffset}
			snapToStart={false}
			snapToEnd={false}
			snapToAlignment='start'

			itemIsSortable={itemIsSortable}
			onDragStart={onDragStart}
			onSortEnd={onSortEnd}

			refreshing={false}
			onRefresh={onRefresh}
			onScrollToIndexFailed={onScrollToIndexFailed}
			onViewableItemsChanged={onViewableItemsChanged} />
	)
}

CollectionsItemsView.propTypes = {
	//customization
	treeProps:			PropTypes.object,
	disableVirtualization:PropTypes.bool,

	//additional items in view
	customRows:			PropTypes.array,
	customRowRenderer:	PropTypes.func,
	customRowKeyExtractor:PropTypes.func,

	//components
	header:				PropTypes.any,
	SearchComponent:	PropTypes.any,

	//events
	onItemPress:		PropTypes.func,
}