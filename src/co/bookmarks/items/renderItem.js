import React from 'react'
import memoizeOne from 'memoize-one'
import { FlatList, Dimensions } from 'react-native'
import ItemContainer from 'co/bookmarks/item'
import { GridWrapStyle, constants } from '../item/view/style'

const getColumnsCount = memoizeOne((viewWidth)=>{
	var columns = parseInt((viewWidth||Dimensions.get('window').width) / 185)
	if (columns<2) columns = 2
	return columns
})

class SpaceRenderItem extends React.PureComponent {
	state = {
		columns: 2
	}

	static getDerivedStateFromProps(props, state) {
		const nextColumns = getColumnsCount(props.viewWidth)
		if (state && nextColumns != state.columns)
			return {
				columns: nextColumns
			}
		return null
	}

	_renderItem = (props)=>{
		return (
			<ItemContainer
				key={'b'+props.item._id}
				bookmarkId={props.item}
				spaceId={this.props.spaceId}
				view={this.props.view}
				columns={this.state.columns}
				showCollectionPath={this.props.showCollectionPath}
				componentId={this.props.componentId} />
		)
	}

	keyExtractor = (item)=>item

	getItemLayout = (data, index) => ({
		length: constants.grid.height,
		offset: constants.grid.height * index,
		index,
	})

	render() {
		switch(this.props.view){
			case 'grid':
			case 'masonry':
				return (
					<FlatList
						columnWrapperStyle={GridWrapStyle.columns}
						key={this.state.columns}
						numColumns={this.state.columns}
						data={this.props.item}
						renderItem={this._renderItem}
						keyExtractor={this.keyExtractor}
						//getItemLayout={this.getItemLayout} 
						/>
				)

			default:
				return this._renderItem(this.props)
		}
	}
}

export default SpaceRenderItem