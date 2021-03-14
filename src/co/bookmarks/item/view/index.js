import React from 'react'
import Swipeable, { Button } from 'co/list/swipeable'
import { Pressable } from 'co/native'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'
import { GridWrap } from './style'

const flexOne = {flex:1}

export default class BookmarkView extends React.Component {
	peeking = false

	static defaultProps = {
		viewHide: [],
		highlight: {}
	}

	leftActions = ()=>(
		<Button 
			icon='checkbox-multiple'
			background='color.yellow'
			color='black'
			onPress={this.props.onSelect} />
	)

	rightActions = ()=>[
		<Button 
			key='share'
			icon='upload-2'
			onPress={this.props.onShare} />,

		<Button 
			key='move'
			icon='folder-shared'
			background='color.purple'
			onPress={this.props.onMove} />,

		<Button 
			key='remove'
			icon='delete-bin'
			background='color.danger'
			onPress={this.props.onRemove} />
	]

	render() {
		const { view, numColumns, onItemPress, onDrag, ...etc } = this.props

		switch(view){
			case 'grid':
			case 'masonry':{
				return (
					<GridWrap numColumns={numColumns}>
						<Pressable 
							onPress={onItemPress} 
							onLongPress={onDrag}
							style={flexOne}>
							<GridView {...etc} />
						</Pressable>
					</GridWrap>
				)
			}
	
			default:{
				return (
					<Swipeable 
						left={etc.showActions && !etc.selectModeEnabled ? this.leftActions : undefined}
						right={etc.showActions && !etc.selectModeEnabled ? this.rightActions : undefined}>
						<Pressable 
							onPress={onItemPress}
							onLongPress={onDrag}>
							{view == 'simple' ? SimpleView(etc) : ListView(etc)}
						</Pressable>
					</Swipeable>
				)
			}
		}
	}
}