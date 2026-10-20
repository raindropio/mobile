import t from 't'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { groupCreate } from 'data/actions/collections'

import Header from 'co/navigation/header'
import { ScrollForm, Form, Input } from 'co/form'

function EditGroupScreen({ navigation }) {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [loading, setLoading] = useState(false)

	const onSave = ()=>{
		setLoading(true)

		dispatch(groupCreate(
			title,
			()=>{
				setLoading(false)
				navigation.goBack()
			},
			()=>
				setLoading(false)
		))
	}

	const disabled = !(title||'').trim() || loading

	return (
		<ScrollForm>
			<Header.Buttons a>
				<Header.Cancel onPress={navigation.goBack} />
			</Header.Buttons>

			<Header.Buttons disabled={disabled}>
				<Header.Button
					title={t.s('create')}
					disabled={disabled}
					bold
					onPress={onSave} />
			</Header.Buttons>

			<Form>
				<Input
					last
					autoFocus
					value={title}
					placeholder={t.s('enterTitle')}
					returnKeyType='done'
					onChangeText={setTitle}
					onSubmitEditing={onSave} />
			</Form>
		</ScrollForm>
	)
}

EditGroupScreen.options = {
	title: t.s('newString') + ' ' + t.s('group').toLowerCase()
}

export default EditGroupScreen