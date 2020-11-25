import React from 'react'
import withNavigation from 'co/navigation/withNavigation'
import { mediumFade } from 'co/style/animation'
import DragView from 'co/common/ipad/DragView'
import DropView from 'co/common/ipad/DropView'
import Swipeable, { Button } from 'co/list/swipeable'

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
					background='color.accent'
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

	render() {
		return (
			<DropView onDrop={this.onDropViewDrop}>
				<DragView dragItem={'https://raindrop.io/collection/'+this.props.item._id}>
					<Swipeable 
						left={this.props.item._id>0 && this.props.item.access.level>=3 ? this.leftActions : undefined}
						right={this.props.item._id>0 ? this.rightActions : undefined}>
						<View
							{...this.props}
							onItemPress={this.onItemPress}
							onToggle={this.onToggle}
							/>
					</Swipeable>
				</DragView>
			</DropView>
		)
	}
}

export default withNavigation(CollectionItemContainer)