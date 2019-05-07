import React from 'react'
import Navigation from 'modules/navigation'
import { fastFade } from 'co/style/animation'

import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

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
		fastFade()
		this.props.groupToggle(this.props._id)
	}

	onActionPress = (name)=>{
		switch(name) {
			case 'add': 
				return this.props.onAdd(this.props._id)

			case 'more': 
				return Navigation.showModal(this.props, 'collections/group/edit', {_id: this.props._id})

			case 'remove':
				if (this.props.collectionsCount)
					return Navigation.showModal(this.props, 'collections/group/notEmpty')
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

export default connect(
	undefined,
	collectionsActions
)(GroupItemContainer)