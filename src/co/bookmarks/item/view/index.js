import React from 'react'
import DragView from 'co/common/ipad/DragView'
import Swipeable, { Button } from 'co/list/swipeable'
import { GotoTap } from 'co/common/goto/style'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'
import { GridWrap } from './style'

export default class BookmarkView extends React.Component {
	peeking = false

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
		const { view, numColumns, onItemPress, ...etc } = this.props

		switch(view){
			case 'grid':
			case 'masonry':{
				return (
					<GridWrap numColumns={numColumns}>
						<DragView dragItem={etc.item.link}>
							<GotoTap onPress={onItemPress}>
								<GridView {...etc} />
							</GotoTap>
						</DragView>
					</GridWrap>
				)
			}
	
			default:{
				return (
					<Swipeable 
						left={etc.showActions && !etc.selectModeEnabled ? this.leftActions : undefined}
						right={etc.showActions && !etc.selectModeEnabled ? this.rightActions : undefined}>
						<DragView dragItem={etc.item.link}>
							<GotoTap onPress={onItemPress}>
								{view == 'simple' ? SimpleView(etc) : ListView(etc)}
							</GotoTap>
						</DragView>
					</Swipeable>
				)
			}
		}
	}
}