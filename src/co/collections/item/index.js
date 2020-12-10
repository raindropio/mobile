import React from 'react'
import { mediumFade } from 'co/style/animation'
import DropView from 'modules/ipad/DropView'
import Swipeable, { Button } from 'co/list/swipeable'
import { GotoTap } from 'co/goto/style'

import View from './view'

class CollectionItemContainer extends React.PureComponent {
	onItemPress = ()=>{
		this.props.onItemPress(this.props.item)
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
		this.props.navigation.navigate('collection', { screen: 'sharing', params: { _id: this.props.item._id } })

	onRemoveCollectionTap = ()=>
		this.props.navigation.navigate('collection', { screen: 'remove', params: this.props.item})

	leftActions = ()=>[
		<Button 
			key='add'
			icon='folder-add'
			background='color.purple'
			onPress={this.onAddNestedTap} />
	]

	rightActions = ()=>{
		const { item: { access: { level } } } = this.props

		return [
			...(level >= 3 ? [
				<Button 
					key='collaborators'
					icon='user-add'
					onPress={this.onCollaboratorsTap} />,

				<Button 
					key='edit'
					icon='edit-box'
					background='color.blue'
					onPress={this.onEditTap} />
			] : []),
	
			<Button 
				key='remove'
				icon='delete-bin'
				background='color.danger'
				onPress={this.onRemoveCollectionTap} />
		]
	}

	onDropViewDrop = (data)=>{
		this.props.onSystemDrop && this.props.onSystemDrop(this.props.item, data)
	}

	onDrag = ()=>{
		if (!this.props.item.access || !this.props.item.access.draggable)
			return false
						
		if (this.props.item.expanded)
			this.onToggle()

		this.props.drag()
	}

	render() {
		return (
			<DropView onDrop={this.onDropViewDrop}>
				<Swipeable 
					left={this.props.item._id>0 && this.props.item.access.level>=3 ? this.leftActions : undefined}
					right={this.props.item._id>0 ? this.rightActions : undefined}>
					<GotoTap 
						onPress={this.onItemPress} 
						onLongPress={this.onDrag}>
						<View
							{...this.props}
							onToggle={this.onToggle} />
					</GotoTap>
				</Swipeable>
			</DropView>
		)
	}
}

export default CollectionItemContainer