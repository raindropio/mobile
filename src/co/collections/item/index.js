import { PureComponent } from 'react';
import { mediumFade } from 'co/style/animation'
import Swipeable, { Button } from 'co/list/swipeable'
import { Pressable } from 'co/native'

import View from './view'

class CollectionItemContainer extends PureComponent {
	onItemPress = ()=>{
		this.props.onItemPress(this.props.item)
	}

	onToggle = ()=>{
		mediumFade()
		this.props.onToggle(this.props.item._id)
	}

	onAddNestedTap = ()=>
		this.props.navigation.navigate('collection/add', { parentId: this.props.item._id })

	onEditTap = ()=>
		this.props.navigation.navigate('collection/edit', this.props.item)

	onCollaboratorsTap = ()=>
		this.props.navigation.navigate('collection/sharing', { _id: this.props.item._id })

	onRemoveCollectionTap = ()=>
		this.props.navigation.navigate('collection/remove', this.props.item)

	rightActions = ()=>{
		const { item: { access: { level } } } = this.props

		return [
			...(level >= 3 ? [
				<Button 
					key='add'
					icon='folder-add'
					onPress={this.onAddNestedTap} />,

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

	render() {
		return (
			<Swipeable 
				right={this.props.item._id>0 ? this.rightActions : undefined}>
				<Pressable 
					onPress={this.onItemPress}>
					<View
						{...this.props}
						onToggle={this.onToggle} />
				</Pressable>
			</Swipeable>
		)
	}
}

export default CollectionItemContainer