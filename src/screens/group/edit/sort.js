import t from 't'
import { useDispatch } from 'react-redux'
import { reorder } from 'data/actions/collections'

import Goto from 'co/goto'

export default function EditGroupSort({ navigation }) {
	const dispatch = useDispatch()

	const onSortPress = ()=>{
		dispatch(reorder('title'))
		navigation.goBack()
	}

	return (
		<Goto
			label={t.s('sortAllCollectionsByName')}
			icon='sort-desc'
			onPress={onSortPress} />
	)
}