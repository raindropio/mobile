import React from 'react'
import { Platform } from 'react-native'
import Swipeable, { Button } from 'co/list/swipeable'
import { Pressable } from 'co/native'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'

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
			icon={Platform.select({ default: 'upload-2', android: 'share' })}
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
		const { view, onItemPress, ...etc } = this.props

		switch(view){
			case 'grid':
			case 'masonry':{
				return (
					<Pressable 
						onPress={onItemPress} 
						style={flexOne}>
						<GridView {...etc} />
					</Pressable>
				)
			}
	
			default:{
				return (
					<Swipeable 
						left={etc.showActions && !etc.selectModeEnabled ? this.leftActions : undefined}
						right={etc.showActions && !etc.selectModeEnabled ? this.rightActions : undefined}>
						<Pressable 
							onPress={onItemPress}>
							{view == 'simple' ? SimpleView(etc) : ListView(etc)}
						</Pressable>
					</Swipeable>
				)
			}
		}
	}
}