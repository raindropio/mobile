import React from 'react'
import {
	View,
	LayoutAnimation
} from 'react-native'
import { getListViewParams } from 'modules/view'

//Containers
import LoadingView from 'co/common/loadingView'
import Footer from '../footer'
import EmptyState from './empty'
import RenderItem from './renderItem'

//Components and styles
import FlatList from 'co/list/flat/basic'
import SectionList from 'co/list/sections/basic'
import Separator from 'co/style/separator'
import Section from '../section'

var cachedViewWidth = 0

export default class SpaceItems extends React.PureComponent {
	scrollHeadPassed = false
	needRefresh = false

	constructor(props) {
		super(props);

		this.state = {
			forceRerender: false,
			viewWidth: cachedViewWidth
		}

		this.prevWidth = 0

		this.prepareItemLayout(props)
	}

	prepareItemLayout = (props)=>{
		var itemHeight = 110;//list default height

		switch(props.collection.view){
			case 'simple':
				itemHeight = 80
			break;

			case 'grid':
			case 'masonry':
				itemHeight = 230
			break;
		}

		switch(props.collection.view) {
			case 'grid':
			case 'masonry':
				this.keyExtractor = (item)=>item[0]+'-'+item[item.length-1]
			break

			default:
				this.keyExtractor = (item)=>item.toString()
			break
		}

		this.listViewParams = getListViewParams(itemHeight)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.collection.view != this.props.collection.view)
			this.prepareItemLayout(this.props)
	}

	renderItem = ({item})=>(
		<RenderItem
			viewWidth={this.state.viewWidth}
			item={item}
			spaceId={this.props.spaceId}
			view={this.props.collection.view}
			showActions={this.props.collection.author}
			navigation={this.props.navigation} />
	)

	renderSectionHeader = ({section})=>
		section.value == '-' ? null : <Section type={section.type} value={section.value} collection={this.props.collection} />

	ListFooterComponent = ()=>(
		<Footer spaceId={this.props.spaceId} />
	)

	ListEmptyComponent = ()=>(
		<EmptyState 
			spaceId={this.props.spaceId}
			navigation={this.props.navigation} />
	)

	onRefresh = ()=>{
		this.needRefresh=true;
		this.props.onRefresh()
	}

	onEndReached = ()=>{
		if (this.props.data.length)
			this.props.onNextPage()
	}

	onLayout = ({nativeEvent})=>{
		if (this.prevWidth !== nativeEvent.layout.width)
			switch(this.props.collection.view){
				case 'grid':
				case 'masonry':{
					this.prevWidth = nativeEvent.layout.width;

					var newState = {
						viewWidth: this.prevWidth
					}

					cachedViewWidth = this.prevWidth

					newState.forceRerender = new Date().getTime()
					LayoutAnimation.easeInEaseOut()

					this.setState(newState)
					break
				}
			}
	}

	isRefreshing = ()=>{
		return this.props.status=='idle' || this.props.status=='loading'
	}

	bindRef = (r)=>{this._list=r}

	render() {
		const ListComponent = this.props.flat ? FlatList : SectionList

		return (
			<LoadingView onLayout={this.onLayout} loading={this.isRefreshing()}>
				<ListComponent
					ref={this.bindRef}
					extraData={this.state.forceRerender}

					data={this.props.flat && this.props.data}
					sections={!this.props.flat && this.props.data}
					
					renderItem={this.renderItem}
					renderSectionHeader={this.renderSectionHeader}
					ItemSeparatorComponent={Separator}
					ListFooterComponent={this.ListFooterComponent}
					ListEmptyComponent={this.ListEmptyComponent}

					keyExtractor={this.keyExtractor}
					{...this.listViewParams}

					refreshing={this.needRefresh && this.isRefreshing()}
					//scrollEventThrottle={2000}
					//onEndReachedThreshold={0.5}

					onRefresh={this.onRefresh}
					onEndReached={this.onEndReached}
					//onViewableItemsChanged={this.onViewableItemsChanged}
					/>
			</LoadingView>
		)
	}
}