import React from 'react'
import { mediumFade } from 'co/style/animation'

import View from './view'
import SwipeableContainer from 'co/common/swipeable'

const buttons = [
	{id: 'add', icon: require('assets/images/add.png')},
	{id: 'more', icon: require('assets/images/edit.png')},
	{id: 'remove', icon: require('assets/images/remove.png'), style: 'destructive'}
]

class GroupItemContainer extends React.PureComponent {
	onItemTap = ()=>{
		this.props.onItemTap(this.props)
	}

	onToggle = ()=>{
		mediumFade()
		this.props.groupToggle(this.props._id)
	}

	onActionPress = (name)=>{
		switch(name) {
			case 'add': 
				return this.props.navigation.navigate('collection', { screen: 'add', params: { parentId: this.props._id } })

			case 'more': 
				return this.props.navigation.navigate('group', { _id: this.props._id })

			case 'remove':
				if (this.props.collectionsCount)
					return this.props.navigation.navigate('group', { screen: 'notEmpty' })
				else
					return this.props.groupRemove(this.props._id)
		}
	}

	render() {
		return (
			<SwipeableContainer buttons={buttons} onPress={this.onActionPress}>
				<View {...this.props} onToggle={this.onToggle} onItemTap={this.onItemTap} />
			</SwipeableContainer>
		)
	}
}

export default GroupItemContainer