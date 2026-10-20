import { memo } from 'react'
import { mediumFade } from 'co/style/animation'

import View from './view'

function GroupItemContainer(props) {
	const { _id, navigation, groupToggle, onItemPress } = props

	const onPress = ()=>
		onItemPress(props)

	const onToggle = ()=>{
		mediumFade()
		groupToggle(_id)
	}

	const onAdd = ()=>
		navigation.navigate('collection/add', {
			parentId: _id,
			onSuccess: onItemPress
		})

	const onMore = ()=>
		navigation.navigate('group/edit', { _id })

	return (
		<View
			{...props}
			onToggle={onToggle}
			onAdd={onAdd}
			onMore={onMore}
			onItemPress={onPress} />
	)
}

export default memo(GroupItemContainer)