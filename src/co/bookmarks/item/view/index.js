import React from 'react'
import {View} from 'react-native'
import SwipeableContainer from 'co/common/swipeable'
import TouchItem from 'co/common/touchItem'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'
import {GridWrap} from './style'

const emptyButtons = []
const buttons = [
	{name: 'share', icon: require('assets/images/share.png')},
	{name: 'star', icon: require('assets/images/star.png')},
	{name: 'move', icon: require('assets/images/move.png')},
	{name: 'remove', icon: require('assets/images/remove.png'), danger: true}
]
const buttonsImportant = buttons.map((b)=>b.name=='star'?Object.assign({},b,{icon:require('assets/images/starFilled.png')}):b)

export default class BookmarkView extends React.Component {
	render() {
		const props = this.props

		switch(props.view){
			case 'grid':
			case 'masonry':{
				return (
					<GridWrap tall={props.showCollectionPath} columns={props.columns}>
						<TouchItem onPress={props.onItemTap} onLongPress={props.onSelect}>
							<GridView {...props} />
						</TouchItem>
					</GridWrap>
				)
			}
	
			default:{
				var btns = props.item.important?buttonsImportant:buttons
				if (props.selectModeEnabled)
					btns = emptyButtons
	
				return (
					<SwipeableContainer key={props.item._id} buttons={btns} onPress={props.onActionPress}>
						<TouchItem onPress={props.onItemTap} onLongPress={props.onSelect}>
							{props.view == 'simple' ? SimpleView(props) : ListView(props)}
						</TouchItem>
					</SwipeableContainer>
				)
			}
		}
	}
}