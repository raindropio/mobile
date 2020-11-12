import t from 't'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import * as configActions from 'data/actions/config'
import { makeTree, makeCollectionsStatus } from 'data/selectors/collections'

//import Sortable from 'co/common/sortable'
import ItemContainer from 'co/collections/item'
import GroupContainer from 'co/collections/group'
import LoadingView from 'co/common/loadingView'
import Empty from './empty'

//size
import { getListViewParams } from 'modules/view'
import SectionList from 'co/list/sections/basic'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import {constants} from '../item/style'
import {sectionHeight} from 'co/style/section'
import { Footer } from './style'

class TreeItems extends React.PureComponent {
	getItemLayout = sectionListGetItemLayout({
		getItemHeight: () => constants.itemHeight,
		getSeparatorHeight: () => 0,//separatorHeight,
		getSectionHeaderHeight: (index) => (
			index == 0 || index == this.props.data.length-1 ? 0/*separatorHeight*/ : sectionHeight
		),
		getSectionFooterHeight: () => 0
	})

	listViewParams = getListViewParams(constants.itemHeight)

	componentDidMount() {
		this.props.actions.collections.changeDefaults({
			items: [
				{_id: 0, title: t.s('allBookmarks')},
				{_id: -1, title: t.s('defaultCollection--1')},
				{_id: -99, title: t.s('defaultCollection--99')}//, color: '#8791A1'
			],
			groupTitle: t.s('myCollections')
		})
		this.props.actions.collections.refresh()

		try{this.scrollToSelected(this.props)}catch(e){console.log(e)}
	}

	scrollToSelected = (props)=>{
		//scroll to selected
		if (props.data.length){
			if (props.selectedId){
				const selectedId = props.selectedId
	
				var sectionIndex=0, itemIndex=0;
				props.data.forEach((group, groupIndex)=>{
					const foundIndex = group.data.findIndex((c)=>c._id==selectedId)
	
					if (foundIndex!=-1 || group._id==selectedId){
						itemIndex = foundIndex==-1?0:foundIndex
						sectionIndex = groupIndex
					}
				})
	
				if (sectionIndex || itemIndex){
					setTimeout(()=>{
						this._list && this._list.scrollToLocation({sectionIndex, itemIndex, viewPosition:0.5, animated:true})
					},150)
				}
			}
		}
	}

	renderItem = ({item})=>(
		<ItemContainer
			{...item}
			selected={this.props.selectedId == item.item._id}
			onItemTap={this.props.onItemTap}
			onSystemDrop={this.props.onSystemDrop}
			onToggle={this.props.actions.collections.oneToggle}
			navigation={this.props.navigation} />
	)

	renderSectionHeader = ({section})=>(
		<GroupContainer 
			_id={section._id}
			title={section.title}
			system={section.system}
			hidden={section.hidden}
			collectionsCount={section.data.length}
			selectable={this.props.groupSelectable}
			selected={this.props.groupSelectable && (this.props.selectedId == section._id)}
			navigation={this.props.navigation}
			onItemTap={this.props.onItemTap}
			groupToggle={this.props.actions.collections.groupToggle}
			groupRemove={this.props.actions.collections.groupRemove} />
	)

	keyExtractor = ({item})=>item._id

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
		if (this.props.showEmptyState && this.props.status=='empty')
			return <Empty {...this.props} />

		return (
			<LoadingView loading={(this.props.status=='idle' || this.props.status=='loading')}>
				<SectionList
					ref={this.bindRef}
					sections={this.props.data}
					renderItem={this.renderItem}
					renderSectionHeader={this.renderSectionHeader}
					//ItemSeparatorComponent={ItemSeparator}

					ListHeaderComponent={this.props.SearchComponent}
					ListFooterComponent={Footer}

					keyExtractor={this.keyExtractor}
					getItemLayout={this.getItemLayout}
					{...this.listViewParams}

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

	const mapStateToProps = (state, props)=>{
		const status = getCollectionsStatus(state)

		return {
			data: getTree(state, props.treeProps),
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