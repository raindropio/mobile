import React from 'react'
import DragView, { dragViewSupported } from 'co/common/ipad/DragView'
import Swipeable, { Button } from 'co/list/swipeable'
import { GotoTap } from 'co/common/goto/style'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'
import { GridWrap } from './style'

export default class BookmarkView extends React.Component {
	peeking = false

	onLongPress = ({ nativeEvent })=>{
		if (!dragViewSupported && nativeEvent.state === State.ACTIVE)
			this.props.onSelect && this.props.onSelect()
	}

	leftActions = ()=>(
		<Button 
			icon='heart-3'
			background='color.yellow'
			variant={this.props.item.important ? 'fill' : 'line'}
			onPress={this.props.onImportant} />
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
						<LongPressGestureHandler onHandlerStateChange={this.onLongPress}>
							<GotoTap onPress={this.props.onItemTap}>
								<DragView dragItem={props.item.link}>
									<GridView {...props} />
								</DragView>
							</GotoTap>
						</LongPressGestureHandler>
					</GridWrap>
				)
			}
	
			default:{
				return (
					<Swipeable 
						left={this.props.showActions && !this.props.selectModeEnabled ? this.leftActions : undefined}
						right={this.props.showActions && !this.props.selectModeEnabled ? this.rightActions : undefined}>
						<LongPressGestureHandler onHandlerStateChange={this.onLongPress}>
							<GotoTap onPress={this.props.onItemTap}>
								<DragView dragItem={props.item.link}>
									{props.view == 'simple' ? SimpleView(props) : ListView(props)}
								</DragView>
							</GotoTap>
						</LongPressGestureHandler>
					</Swipeable>
				)
			}
		}
	}
}