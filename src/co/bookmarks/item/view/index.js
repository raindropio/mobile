import React from 'react'
import Navigation from 'modules/navigation'
import SwipeableContainer from 'co/common/swipeable'
import TouchItem from 'co/common/touchItem'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'
import {GridWrap} from './style'

const emptyButtons = []
const buttons = [
	{id: 'share', icon: require('assets/images/share.png')},
	{id: 'star', icon: require('assets/images/star.png')},
	{id: 'move', icon: require('assets/images/move.png')},
	{id: 'remove', icon: require('assets/images/remove.png'), style: 'destructive'}
]
const buttonsImportant = buttons.map((b)=>b.id=='star'?Object.assign({},b,{icon:require('assets/images/starFilled.png')}):b)

export default class BookmarkView extends React.Component {
	render() {
		const props = this.props

		switch(props.view){
			case 'grid':
			case 'masonry':{
				return (
					<GridWrap tall={props.showCollectionPath} columns={props.columns}>
						<Navigation.TouchablePreview touchableComponent={TouchItem} onPress={props.onItemTap} onPressIn={props.onItemTap} onLongPress={props.onSelect}>
							<GridView {...props} />
						</Navigation.TouchablePreview>
					</GridWrap>
				)
			}
	
			default:{
				var btns = props.item.important?buttonsImportant:buttons
				if (props.selectModeEnabled)
					btns = emptyButtons
	
				return (
					<SwipeableContainer key={props.item._id} buttons={btns} onPress={props.onActionPress}>
						<Navigation.TouchablePreview touchableComponent={TouchItem} onPress={props.onItemTap} onPressIn={props.onItemTap} onLongPress={props.onSelect}>
							{props.view == 'simple' ? SimpleView(props) : ListView(props)}
						</Navigation.TouchablePreview>
					</SwipeableContainer>
				)
			}
		}
	}
}