import { memo } from 'react'
import { mediumFade } from 'co/style/animation'
import Swipeable, { Button } from 'co/list/swipeable'
import { Touchable } from 'react-native-gesture-handler'

import View from './view'

function CollectionItemContainer(props) {
	const { item, navigation, onItemPress, onToggle } = props

	const onPress = ()=>
		onItemPress(item)

	const onToggleTap = ()=>{
		mediumFade()
		onToggle(item._id)
	}

	const onAddNestedTap = ()=>
		navigation.navigate('collection/add', { parentId: item._id })

	const onEditTap = ()=>
		navigation.navigate('collection/edit', item)

	const onRemoveCollectionTap = ()=>
		navigation.navigate('collection/remove', item)

	const rightActions = ()=>{
		const { access: { level } } = item

		return [
			...(level >= 3 ? [
				<Button
					key='add'
					icon='folder-add'
					onPress={onAddNestedTap} />,

				<Button
					key='edit'
					icon='edit-box'
					background='color.blue'
					onPress={onEditTap} />
			] : []),

			<Button
				key='remove'
				icon='delete-bin'
				background='color.danger'
				onPress={onRemoveCollectionTap} />
		]
	}

	return (
		<Swipeable
			right={item._id>0 ? rightActions : undefined}>
			<Touchable
				androidRipple={{}}
				onPress={onPress}>
				<View
					{...props}
					onToggle={onToggleTap} />
			</Touchable>
		</Swipeable>
	)
}

export default memo(CollectionItemContainer)