import t from 't'
import React from 'react'
import { height as searchBarHeight } from 'co/common/searchBar/style'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import * as configActions from 'data/actions/config'
import { makeTree, makeCollectionsStatus } from 'data/selectors/collections'

//import Sortable from 'co/common/sortable'
import ItemContainer from 'co/collections/item'
import GroupContainer from 'co/collections/group'
import AddGroup from 'co/collections/group/add'
import LoadingView from 'co/common/loadingView'

//size
import SectionList from 'co/list/sections/basic'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import {constants} from '../item/style'
import {sectionHeight} from 'co/style/section'

const containerStyle = {minHeight: '100%', paddingBottom: searchBarHeight}
const snapToOffsets = [0, searchBarHeight]
const contentOffset = {x:0, y: searchBarHeight}

class TreeItems extends React.PureComponent {
	constructor(props) {
		super(props);

		props.actions.collections.changeDefaults({
			items: [
				{_id: 0, title: t.s('allBookmarks')},
				{_id: -1, title: t.s('defaultCollection--1'), color: '#4E6EF4'},
				{_id: -99, title: t.s('defaultCollection--99'), color: '#8791A1'}
			],
			groupTitle: t.s('myCollections')
		})
		props.actions.collections.load()

		this.getItemLayout = sectionListGetItemLayout({
			getItemHeight: () => constants.itemHeight,
			getSeparatorHeight: () => 0,//separatorHeight,
			getSectionHeaderHeight: (index) => (
				index == 0 || index == this.props.data.length-1 ? 0/*separatorHeight*/ : sectionHeight
			),
			getSectionFooterHeight: () => 0
		})

		this.perPage = 40
	}

	componentDidMount() {
		try{this.scrollToSelected(this.props)}catch(e){console.log(e)}
	}

	scrollToSelected = (props)=>{
		//scroll to selected
		if (props.data.length){
			if (props.options.selectedId){
				const selectedId = props.options.selectedId
	
				var sectionIndex=0, itemIndex=0;
				props.data.forEach((group, groupIndex)=>{
					const foundIndex = group.data.findIndex((c)=>c._id==selectedId)
	
					if (foundIndex!=-1 || group._id==selectedId){
						itemIndex = foundIndex==-1?0:foundIndex
						sectionIndex = groupIndex
					}
				})
	
				if (sectionIndex || itemIndex){
					setTimeout(()=>this._list.scrollToLocation({sectionIndex, itemIndex, viewPosition:0.5, animated:true}),150)
				}
			}
		}
	}

	listFooterComponent = ()=>{
		if (!this.props.groupSelectable)
			return null

		return (
			<AddGroup 
				componentId={this.props.componentId} />
		)
	}

	renderItem = ({item})=>(
		<ItemContainer
			collectionId={item._id}
			selected={this.props.options.selectedId == item._id}
			level={item.level}
			expandable={item.expandable}
			onItemTap={this.props.onItemTap}
			componentId={this.props.componentId}
			onAdd={this.props.onAdd} />
	)

	renderSectionHeader = ({section})=>(
		<GroupContainer 
			_id={section._id}
			title={section.title}
			system={section.system}
			hidden={section.hidden}
			collectionsCount={section.data.length}
			selectable={this.props.groupSelectable}
			selected={this.props.groupSelectable && (this.props.options.selectedId == section._id)}
			componentId={this.props.componentId}
			onItemTap={this.props.onItemTap}
			onAdd={this.props.onAdd} />
	)

	keyExtractor = (item)=>item._id

	onRefresh = ()=>{
		this.needRefresh=true;
		this.props.actions.collections.refresh()
	}

	isRefreshing = ()=>(this.needRefresh && !this.props.data.length)?true:false

	onScrollToIndexFailed = ()=>{}

	bindRef = (r)=>{
		this._list=r
	}

	render() {
		return (
			<LoadingView loading={(this.props.status=='idle' || this.props.status=='loading')}>
				<SectionList
					ref={this.bindRef}
					sections={this.props.data}
					renderItem={this.renderItem}
					renderSectionHeader={this.renderSectionHeader}
					//ItemSeparatorComponent={ItemSeparator}
					ListFooterComponent={this.listFooterComponent}

					ListHeaderComponent={this.props.SearchComponent}
					contentContainerStyle={containerStyle}
					contentOffset={this.props.SearchComponent && contentOffset}
					snapToOffsets={this.props.SearchComponent && snapToOffsets}
					snapToStart={false}
					snapToEnd={false}
					snapToAlignment='start'

					keyExtractor={this.keyExtractor}
					getItemLayout={this.getItemLayout}
					initialNumToRender={this.perPage/2}
					windowSize={this.perPage*4+1}
					maxToRenderPerBatch={this.perPage}
					updateCellsBatchingPeriod={50}

					scrollEnabled={!this.props.disableScroll}
					refreshing={this.isRefreshing()}

					onRefresh={this.onRefresh}
					onScrollToIndexFailed={this.onScrollToIndexFailed}
					/>
			</LoadingView>
		)
	}
}

const makeMapStateToProps = () => {
	const getTree = makeTree()
	const getCollectionsStatus = makeCollectionsStatus()

	const mapStateToProps = (state, {options})=>{
		const status = getCollectionsStatus(state)

		return {
			data: getTree(state, {options}),
			status,
			disableScroll: state.local.disableScroll
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			collections: bindActionCreators(collectionsActions, dispatch),
			config: 	 bindActionCreators(configActions, dispatch)
		}
	})
)(TreeItems)