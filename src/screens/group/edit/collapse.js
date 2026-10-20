import t from 't'
import { useDispatch } from 'react-redux'
import { toggle } from 'data/actions/collections'

import Goto from 'co/goto'

export default function EditGroupCollapse({ navigation }) {
	const dispatch = useDispatch()

	const onPress = ()=>{
		dispatch(toggle())
		navigation.goBack()
	}

	return (
		<Goto
			last
			icon='node-tree'
			label={t.s('collapseAllCollections')}
			onPress={onPress} />
	)
}