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
import SectionList from 'co/list/sections/basic'
import { Separators } from '../item/view/style'
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

		this.listViewParams = getListViewParams(itemHeight)
	}

	componentDidMount() {
		/*setTimeout(()=>{
			try{this._list.getScrollResponder().scrollTo({x: 0, y: headContextHeight, animated: false})}catch(e){console.log(e)}
		}, 0)
		setTimeout(()=>{
			this._list.scrollToLocation({
				sectionIndex: 2,
				itemIndex: 0,
				viewPosition: 0
			})
		}, 1000)*/
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.collection.view != this.props.collection.view)
			this.prepareItemLayout(nextProps)
	}

	renderItem = ({item})=>(
		<RenderItem
			viewWidth={this.state.viewWidth}
			item={item}
			spaceId={this.props.spaceId}
			view={this.props.collection.view}
			showCollectionPath={this.props.showCollectionPath}
			componentId={this.props.componentId} />
	)

	renderSectionHeader = ({section})=>
		<Section type={section.type} value={section.value} />

	ListFooterComponent = ()=>(
		<Footer spaceId={this.props.spaceId} />
	)

	ListEmptyComponent = ()=>(
		<EmptyState 
			spaceId={this.props.spaceId}
			componentId={this.props.componentId} />
	)

	keyExtractor = ()=>{
		switch(this.props.collection.view){
			case 'grid':
			case 'masonry':
				return (item)=>item[0]+'-'+item[item.length-1]

			default:
				return (item)=>item
		}
	}

	onRefresh = ()=>{
		this.needRefresh=true;
		this.props.onRefresh()
	}

	onEndReached = ()=>{
		if (this.props.data.length)
			this.props.onNextPage()
	}

	onLayout = ({nativeEvent})=>{
		if (this.prevWidth !== nativeEvent.layout.width){
			this.prevWidth = nativeEvent.layout.width;

			var newState = {
				viewWidth: this.prevWidth
			}

			cachedViewWidth = this.prevWidth

			switch(this.props.collection.view){
				case 'grid':
				case 'masonry':{
					newState.forceRerender = new Date().getTime()
					LayoutAnimation.easeInEaseOut()
					break
				}
			}

			this.setState(newState)
		}
	}

	isRefreshing = ()=>{
		return this.props.status=='idle' || this.props.status=='loading'
	}

	bindRef = (r)=>{this._list=r}

	render() {
		return (
			<LoadingView onLayout={this.onLayout} loading={this.isRefreshing()}>
				<SectionList
					ref={this.bindRef}
					extraData={this.state.forceRerender}
					sections={this.props.data}
					renderItem={this.renderItem}
					renderSectionHeader={this.renderSectionHeader}
					ItemSeparatorComponent={Separators[this.props.collection.view]}
					ListFooterComponent={this.ListFooterComponent}
					ListEmptyComponent={this.ListEmptyComponent}

					keyExtractor={this.keyExtractor()}
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