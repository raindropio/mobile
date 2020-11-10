import React from 'react'
import withNavigation from 'co/navigation/withNavigation'
import { mediumFade } from 'co/style/animation'
import DragView from 'co/common/ipad/DragView'
import DropView from 'co/common/ipad/DropView'
import Swipeable, { Button } from 'co/list/swipeable'

import View from './view'

class CollectionItemContainer extends React.PureComponent {
	onItemTap = ()=>{
		this.props.onItemTap(this.props.item)
	}

	onToggle = ()=>{
		mediumFade()
		this.props.onToggle(this.props.item._id)
	}

	onAddNestedTap = ()=>
		this.props.navigation.navigate('collection', { screen: 'add', params: { parentId: this.props.item._id } })

	onEditTap = ()=>
		this.props.navigation.navigate('collection', { screen: 'edit', params: this.props.item })

	onCollaboratorsTap = ()=>
		this.props.navigation.navigate('collection', { screen: 'sharing/list', params: { _id: this.props.item._id } })

	onRemoveCollectionTap = ()=>
		this.props.navigation.navigate('collection', { screen: 'remove', params: this.props.item})

	leftActions = ()=>[
		<Button 
			key='add'
			icon='folder-add'
			variant='fill'
			background='color.purple'
			onPress={this.onAddNestedTap} />
	]

	rightActions = ()=>[
		<Button 
			key='collaborators'
			icon='account-circle'
			variant='fill'
			onPress={this.onCollaboratorsTap} />,

		<Button 
			key='edit'
			icon='pencil'
			variant='fill'
			background='color.accent'
			onPress={this.onEditTap} />,

		<Button 
			key='remove'
			icon='delete-bin'
			variant='fill'
			background='color.danger'
			onPress={this.onAddNestedTap} />
	]

	onDropViewDrop = (data)=>{
		this.props.onSystemDrop && this.props.onSystemDrop(this.props.item, data)
	}

	render() {
		return (
			<DropView onDrop={this.onDropViewDrop}>
				<DragView dragItem={'https://raindrop.io/collection/'+this.props.item._id}>
					<Swipeable 
						left={this.leftActions}
						right={this.rightActions}>
						<View
							{...this.props}
							onItemTap={this.onItemTap}
							onToggle={this.onToggle}
							/>
					</Swipeable>
				</DragView>
			</DropView>
		)
	}
}

export default withNavigation(CollectionItemContainer)