import React from 'react'
import DragView, { dragViewSupported } from 'co/common/ipad/DragView'
import SwipeableContainer from 'co/common/swipeable'
import { RectButton, LongPressGestureHandler, State } from 'react-native-gesture-handler'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'
import { GridWrap } from './style'

const emptyButtons = []
const buttons = [
	{id: 'share', icon: require('assets/images/share.png')},
	{id: 'star', icon: require('assets/images/star.png')},
	{id: 'move', icon: require('assets/images/move.png')},
	{id: 'remove', icon: require('assets/images/remove.png'), style: 'destructive'}
]
const buttonsImportant = buttons.map((b)=>b.id=='star'?Object.assign({},b,{icon:require('assets/images/starFilled.png')}):b)

export default class BookmarkView extends React.Component {
	peeking = false

	onLongPress = ({ nativeEvent })=>{
		if (!dragViewSupported && nativeEvent.state === State.ACTIVE)
			this.props.onSelect && this.props.onSelect()
	}

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
				var btns = props.item.important?buttonsImportant:buttons
				if (props.selectModeEnabled || !props.showActions)
					btns = emptyButtons
	
				return (
					<SwipeableContainer key={props.item._id} buttons={btns} onPress={props.onActionPress}>
						<LongPressGestureHandler onHandlerStateChange={this.onLongPress}>
							<RectButton onPress={this.props.onItemTap}>
								<DragView dragItem={props.item.link}>
									{props.view == 'simple' ? SimpleView(props) : ListView(props)}
								</DragView>
							</RectButton>
						</LongPressGestureHandler>
					</SwipeableContainer>
				)
			}
		}
	}
}