import t from 't'
import Button, { Buttons } from 'co/button'

export default function EditGroupAdd({ navigation }) {
	const onAddPress = ()=>
		navigation.replace('group/add')

	return (
		<Buttons vertical>
			<Button
				onPress={onAddPress}
				title={`${t.s('create')} ${t.s('newString')} ${t.s('group').toLowerCase()}`} />
		</Buttons>
	)
}