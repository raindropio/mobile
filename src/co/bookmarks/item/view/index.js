import React from 'react'
import DragView, { dragViewSupported } from 'co/common/ipad/DragView'
import Swipeable, { Button } from 'co/list/swipeable'
import { RectButton, LongPressGestureHandler, State } from 'react-native-gesture-handler'

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
			icon='share-forward-box'
			variant='fill'
			onPress={this.props.onShare} />,

		<Button 
			key='move'
			icon='folder-transfer'
			background='color.purple'
			variant='fill'
			onPress={this.props.onMove} />,

		<Button 
			key='remove'
			icon='delete-bin'
			background='color.danger'
			variant='fill'
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
							<RectButton onPress={this.props.onItemTap}>
								<DragView dragItem={props.item.link}>
									<GridView {...props} />
								</DragView>
							</RectButton>
						</LongPressGestureHandler>
					</GridWrap>
				)
			}
	
			default:{
				return (
					<Swipeable 
						left={this.leftActions}
						right={this.rightActions}>
						<LongPressGestureHandler onHandlerStateChange={this.onLongPress}>
							<RectButton onPress={this.props.onItemTap}>
								<DragView dragItem={props.item.link}>
									{props.view == 'simple' ? SimpleView(props) : ListView(props)}
								</DragView>
							</RectButton>
						</LongPressGestureHandler>
					</Swipeable>
				)
			}
		}
	}
}