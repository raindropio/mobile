import t from 't'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { groupRemove } from 'data/actions/collections'
import { group } from 'data/selectors/collections'

import Warning from 'co/alert/warning'
import Button, { Buttons } from 'co/button'

export default function EditGroupRemove({ _id, navigation }) {
	const dispatch = useDispatch()
	const collections = useSelector(state=>group(state, _id).collections)

	const [showWarning, setShowWarning] = useState(false)

	const onRemovePress = ()=>{
		if (collections.length)
			setShowWarning(true)
		else
			dispatch(groupRemove(_id, navigation.goBack))
	}

	if (showWarning)
		return (
			<Warning message={t.s('removeGroupError')} />
		)

	return (
		<Buttons vertical>
			<Button
				color='danger'
				onPress={onRemovePress}
				title={`${t.s('remove')} ${t.s('group').toLowerCase()}`} />
		</Buttons>
	)
}