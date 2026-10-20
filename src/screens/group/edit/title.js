import t from 't'
import { useState, useEffect, useEffectEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { groupRename } from 'data/actions/collections'
import { group } from 'data/selectors/collections'

import { Input } from 'co/form'

export default function EditGroupTitle({ _id, navigation }) {
	const dispatch = useDispatch()
	const initialTitle = useSelector(state=>group(state, _id).title)

	const [title, setTitle] = useState(initialTitle)

	//save on unmount
	const save = useEffectEvent(()=>{
		if ((title||'').trim())
			dispatch(groupRename(_id, title))
	})

	useEffect(()=>()=>save(), [])

	return (
		<Input
			last
			heading
			value={title}
			placeholder={t.s('name')}
			returnKeyType='done'
			onChangeText={setTitle}
			onSubmitEditing={navigation.goBack} />
	)
}