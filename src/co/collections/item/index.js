import t from 't'
import React from 'react'
import withNavigation from 'co/navigation/withNavigation'
import { mediumFade } from 'co/style/animation'
import DragView from 'co/common/ipad/DragView'
import DropView from 'co/common/ipad/DropView'

import View from './view'
import SwipeableContainer from 'co/common/swipeable'

const buttons = [
	{id: 'addNested', title: t.s('createSubFolder'), icon: require('assets/images/addCollection.png')},
	{id: 'editCollection', title: t.s('collectionEdit'), icon: require('assets/images/edit.png')},
	{id: 'removeCollection', title: t.s('remove'), icon: require('assets/images/remove.png'), style: 'destructive'}
]
const buttonsEmpty = []

class CollectionItemContainer extends React.PureComponent {
	onItemTap = ()=>{
		this.props.onItemTap(this.props.item)
	}

	onToggle = ()=>{
		mediumFade()
		this.props.onToggle(this.props.item._id)
	}

	onActionPress = (id)=>{
		switch(id){
			case 'editCollection':
				this.props.navigation.navigate('collection', { screen: 'edit', params: this.props.item })
			break

			case 'addNested':
				this.props.navigation.navigate('collection', { screen: 'add', params: { parentId: this.props.item._id } })
			break

			case 'removeCollection':
				this.props.navigation.navigate('collection', { screen: 'remove', params: this.props.item})
			break
		}
	}

	onDropViewDrop = (data)=>{
		this.props.onSystemDrop && this.props.onSystemDrop(this.props.item, data)
	}

	render() {
		return (
			<DropView onDrop={this.onDropViewDrop}>
				<DragView dragItem={'https://raindrop.io/collection/'+this.props.item._id}>
					<SwipeableContainer buttons={this.props.item._id>0?buttons:buttonsEmpty} onPress={this.onActionPress}>
						<View
							{...this.props}
							onItemTap={this.onItemTap}
							onToggle={this.onToggle}
							/>
					</SwipeableContainer>
				</DragView>
			</DropView>
		)
	}
}

export default withNavigation(CollectionItemContainer)