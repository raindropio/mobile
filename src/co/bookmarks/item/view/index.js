import React from 'react'
import { View } from 'react-native'
import Navigation from 'modules/navigation'
import DragView, { dragViewSupported } from 'co/common/iPadDragView'
import SwipeableContainer from 'co/common/swipeable'
import TouchItem from 'co/common/touchItem'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'
import { styles } from './style'

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

	touchableProps = {
		touchableComponent: TouchItem,
		onPress: this.props.onItemTap,
		onPressIn: this.props.onItemTapIn,
		onLongPress: ()=>{
			if (this.peeking) {
				this.peeking=false
				return
			}
			if (!dragViewSupported)
				this.props.onSelect && this.props.onSelect()
		},

		onPeekIn: ()=>{
			this.peeking=true
		},

		onPeekOut: ()=>{
			this.peeking=false
		}
	}

	render() {
		const props = this.props

		switch(props.view){
			case 'grid':
			case 'masonry':{
				return (
					<View style={[styles.gridWrap, { flex: 1/props.columns }]}>
						<Navigation.TouchablePreview {...this.touchableProps}>
							<DragView dragItem={props.item.link}>
								<GridView {...props} />
							</DragView>
						</Navigation.TouchablePreview>
					</View>
				)
			}
	
			default:{
				var btns = props.item.important?buttonsImportant:buttons
				if (props.selectModeEnabled || !props.showActions)
					btns = emptyButtons
	
				return (
					<SwipeableContainer key={props.item._id} buttons={btns} onPress={props.onActionPress}>
						<Navigation.TouchablePreview {...this.touchableProps}>
							<DragView dragItem={props.item.link}>
								{props.view == 'simple' ? SimpleView(props) : ListView(props)}
							</DragView>
						</Navigation.TouchablePreview>
					</SwipeableContainer>
				)
			}
		}
	}
}