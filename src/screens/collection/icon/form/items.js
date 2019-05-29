import React from 'react'
import _ from 'lodash-es'
import Icon from 'co/common/icon'
import {GridStyle, IconTap, GridView, iconSize} from './style'

const perPage = 6*4

export default class PickIconItems extends React.PureComponent {
	keyExtractor = (item)=>item.path

	renderItem = ({item})=>(
		<IconTap active={item.path == this.props.cover_path} onPress={()=>this.props.onSelect(item.path, item.src)}>
			<Icon src={item.src} size='big' />
		</IconTap>
	)

	getItemLayout = (data, index) => (
		{length: iconSize, offset: iconSize * index, index}
	)

	render() {
		var columns = parseInt(this.props.width/iconSize)
		if (columns<2) columns=2

		const selectedIndex = _.findIndex(this.props.items, ({path})=>path==this.props.cover_path)

		return (
			<GridView 
				style={{width: this.props.width}}
				data={this.props.items}
				key={columns}
				numColumns={columns}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				getItemLayout={this.getItemLayout}
				columnWrapperStyle={GridStyle.columns}
				initialNumToRender={perPage}
				initialScrollIndex={selectedIndex != -1 ? parseInt(selectedIndex/columns) : 0}
				windowSize={perPage}
				maxToRenderPerBatch={perPage}
				/>
		)
	}
}