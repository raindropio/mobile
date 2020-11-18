import React from 'react'
import _ from 'lodash-es'
import Icon from 'co/collections/item/icon'
import { IconTap, GridView, iconSize } from './style'

export default class PickCoverIcons extends React.PureComponent {
	keyExtractor = (item)=>item.png

	renderItem = ({item})=>(
		<IconTap onPress={()=>this.props.onSelect(item.png)}>
			<Icon src={item.png} />
		</IconTap>
	)

	getItemLayout = (data, index) => (
		{length: iconSize, offset: iconSize * index, index}
	)

	render() {
		return (
			<GridView 
				data={this.props.icons}
				key={this.props.columns}
				numColumns={this.props.columns}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				getItemLayout={this.getItemLayout}
				/>
		)
	}
}