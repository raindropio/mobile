import { View } from 'react-native'
import { Touchable } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { collection } from 'data/selectors/collections'
import Icon from 'co/collections/item/icon'
import { ItemSubinfo } from 'co/style/item'

const touchableStyle = {
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center'
}
const iconStyle = {
	width: 20,
	height: 20,
	marginRight: 8
}

export default function CommonCollectionContainer({ collectionId, onPress }) {
	const { _id, title, cover=[] } = useSelector(state=>collection(state, collectionId))

	return (
		<Touchable
			activeOpacity={0.2}
			style={touchableStyle}
			onPress={()=>onPress(_id)}
			hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
			<View style={iconStyle}>
				<Icon collectionId={_id} src={cover[0]} size={16} />
			</View>
			<ItemSubinfo numberOfLines={1}>{title}</ItemSubinfo>
		</Touchable>
	)
}