import Goto from 'co/goto'
import useItemInfo from './useItemInfo'

export default function FilterItem({ onItemPress, ...item }) {
	const { icon, title, info, color } = useItemInfo(item)
	const onPress = ()=>onItemPress(item._id, item)

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