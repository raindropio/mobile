import { useCallback } from 'react';
import Goto from 'co/goto'
import useItemInfo from './useItemInfo'

export default function FilterItem({ onItemPress, ...item }) {
	const { icon, title, info, color } = useItemInfo(item)
	const onPress = useCallback(()=>{
		onItemPress(item._id, item)
	}, [item, onItemPress])

	return (
		<Goto 
			last
			label={title}
			subLabel={info||''}
			icon={icon}
			color={color}
			action=''
			onPress={onPress} />
	)
}