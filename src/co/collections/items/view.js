import t from 't'
import React from 'react'
import { AppState } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { load, refresh, groupRemove, groupToggle, groupReorder, oneToggle, changeDefaults, oneReorder, expandTo } from 'data/actions/collections'
import { makeTreeFlat, makeCollectionsStatus } from 'data/selectors/collections'

import ItemContainer from 'co/collections/item'
import GroupContainer from 'co/collections/group'
import Empty from './empty'
import Shadow from 'co/list/helpers/shadow'
import { Footer } from './style'
import FoundSection from './found'

//size
import FlatList from 'co/list/flat/basic'
import SortableFlatList from 'co/list/flat/sortable'
import { getListViewParams } from 'modules/view'
import size from 'modules/appearance/size'

class CollectionsItemsView extends React.Component {
	static propTypes = {
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
		onSystemDrop:		PropTypes.func,
	}

	listViewParams = getListViewParams(size.height.item)
	sortable = React.createRef()

	componentDidMount() {
		this.props.changeDefaults({
			items: [
				{_id: 0, title: t.s('allBookmarks')},
				{_id: -1, title: t.s('defaultCollection--1')},
				{_id: -99, title: t.s('defaultCollection--99')}//, color: '#8791A1'
			],
			groupTitle: t.s('myCollections')
		})

		this.props.load()

		AppState.addEventListener('change', this.onAppStateChange)

		this.scrollToSelected()
	}

	componentWillUnmount() {
		AppState.removeEventListener('change')
	}

	onAppStateChange = (state)=>{
		if (state == 'active')
			this.props.refresh()
	}

	//scrolling
	componentDidUpdate(prevProps) {
		if (prevProps.selectedId != this.props.selectedId)
			setTimeout(this.scrollToSelected, 100)
	}

	scrollToSelected = ()=> {
		const { current } = this.sortable
		const { selectedId, data, expandTo } = this.props
		
		if (!current ||
			!current.flatlistRef ||
			!current.flatlistRef.current) return

		//expand to selected item
		expandTo(selectedId)

		const index = data.findIndex(({item})=>item && item._id == selectedId)

		if (index > 0 && index < data.length-1){
			//prevent scroll when item is visible
			if (this._viewableItems && this._viewableItems.length)
				if (this._viewableItems.find(item=>item.index==index))
					return

			current.flatlistRef.current._component.scrollToIndex({
				index,
				animated: true,
				viewPosition: .5
			})
		}
	}

	onScrollToIndexFailed = ()=>{}
	onViewableItemsChanged = ({viewableItems})=>
		this._viewableItems = viewableItems

	//dragging
	onDragEnd = ({ from, to })=>{
		const origin = this.props.data[from]
		const target = this.props.data[to]

		if (from == to || !origin || !target) return
		
		switch (origin.type) {
            case 'collection':{
				if (target.type == 'collection'){
					if (to >= from)
						this.props.oneReorder(origin.item._id, { after: target.item._id })
					else if (to <= from)
						this.props.oneReorder(origin.item._id, { before: target.item._id })
				}
				else {
					//to end of previous group
					if (to < from &&
						this.props.data[to-1]){
						const prev = this.props.data[to-1]

						this.props.oneReorder(
							origin.item._id, 
							prev.item ? 
								{ after: this.props.data[to-1].item._id } : 
								{ to: prev._id }
						)
					}
					//to start of current group
					else
                    	this.props.oneReorder(origin.item._id, { to: target.item ? target.item._id : target._id })
				}
            }break
            
            case 'group':{
                let after, before

                if (to > from) {
                    if (target.type == 'group')
                        after = target._id
                    else
                        for(let i=to-1; i>0; i--)
                            if (this.props.data[i].type=='group'){
                                after=this.props.data[i]._id
                                break
                            }
                } else if (to < from) {
                    if (target.type == 'group')
                        before = target._id
                    else
                        for(let i=to+1; i<this.props.data.length; i++)
                            if (this.props.data[i].type=='group'){
                                before=this.props.data[i]._id
                                break
                            }
                }

                if (after || before)
                    this.props.groupReorder(origin._id, { after, before })
            }break
        }
	}

	//items itself
	getItemLayout = (data, index) => ({
		length: size.height.item, 
		offset: size.height.item * index, 
		index
	})

	renderItem = (data)=>{
		const { item: row, drag, isActive: isDrag } = data
		const { treeProps: { options={} }, status } = this.props

		switch (row.type) {
			case 'collection':
				return (
					<ItemContainer
						{...row}
						drag={options.search ? undefined : drag}
						isDrag={isDrag}
						selected={this.props.selectedId == row.item._id}
						onItemPress={this.props.onItemPress}
						onSystemDrop={this.props.onSystemDrop}
						onToggle={this.props.oneToggle}
						navigation={this.props.navigation} />
				)
		
			case 'group':
				return (
					<GroupContainer 
						{...row}
						status={status}
						drag={drag}
						isDrag={isDrag}
						selectable={this.props.groupSelectable}
						selected={this.props.groupSelectable && (this.props.selectedId == row._id)}
						navigation={this.props.navigation}
						onItemPress={this.props.onItemPress}
						groupToggle={this.props.groupToggle}
						groupRemove={this.props.groupRemove} />
				)

			default:
				if (this.props.customRowRenderer)
					return this.props.customRowRenderer(data)
				else
					return null
		}
	}

	keyExtractor = (row)=>{
		if (!row) return null

		switch(row.type){
			case 'collection':
				return String(row.item._id)

			case 'group':
				return String(row._id)

			default:
				if (this.props.customRowKeyExtractor)
					return this.props.customRowKeyExtractor(row)
				else
					return null
		}
	}

	renderHeader = ()=>{
		const { SearchComponent, header } = this.props

		return (
			<>
				{header ? (typeof header == 'function' ? header() : header) : null}

				{SearchComponent ? SearchComponent : null}
				<FoundSection {...this.props} />
			</>
		)
	}

	render() {
		const { data, status, showEmptyState, refresh, customRows, disableVirtualization, selectedId, snapToOffsets, contentOffset } = this.props

		if (showEmptyState && status=='empty')
			return <Empty {...this.props} />

		//sortableFlatList is bad to be embeded so this line fix this
		const Component = disableVirtualization ? FlatList : SortableFlatList

		return (
			<Shadow>{onScroll=>
				<Component
					{...this.listViewParams}

					ref={this.sortable}
					data={customRows ? [...data, ...customRows] : data}
					extraData={selectedId}
					keyExtractor={this.keyExtractor}
					
					disableVirtualization={disableVirtualization}
					getItemLayout={this.getItemLayout}
					
					renderItem={this.renderItem}
					ListHeaderComponent={this.renderHeader}
					ListFooterComponent={disableVirtualization ? undefined : Footer}
					onScroll={onScroll}

					// snapToOffsets={snapToOffsets}
					// contentOffset={contentOffset}
					// snapToStart={false}
					// snapToEnd={false}
					// snapToAlignment='start'
					
					layoutInvalidationKey={data}
					onDragEnd={this.onDragEnd}

					refreshing={false}
					onRefresh={refresh}
					onScrollToIndexFailed={this.onScrollToIndexFailed}
					onViewableItemsChanged={this.onViewableItemsChanged} />
			}</Shadow>
		)
	}
}

export default connect(
	() => {
		const getTree = makeTreeFlat()
		const getCollectionsStatus = makeCollectionsStatus()
	
		return (state, props)=>({
			data: getTree(state, props.treeProps),
			status: getCollectionsStatus(state)
		})
	},
	{ load, refresh, groupRemove, groupToggle, groupReorder, oneToggle, changeDefaults, oneReorder, expandTo }
)(CollectionsItemsView)