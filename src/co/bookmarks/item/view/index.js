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
		const props = this.props

		switch(props.view){
			case 'grid':
			case 'masonry':{
				return (
					<GridWrap style={{ flex: 1/props.columns }}>
						<GotoTap onPress={this.props.onItemPress}>
							<DragView dragItem={props.item.link}>
								<GridView {...props} />
							</DragView>
						</GotoTap>
					</GridWrap>
				)
			}
	
			default:{
				return (
					<Swipeable 
						left={this.props.showActions && !this.props.selectModeEnabled ? this.leftActions : undefined}
						right={this.props.showActions && !this.props.selectModeEnabled ? this.rightActions : undefined}>
						<GotoTap onPress={this.props.onItemPress}>
							<DragView dragItem={props.item.link}>
								{props.view == 'simple' ? SimpleView(props) : ListView(props)}
							</DragView>
						</GotoTap>
					</Swipeable>
				)
			}
		}
	}
}