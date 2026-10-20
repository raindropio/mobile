import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { setAppearance } from 'local/actions'

import themes from './themes'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

function SettingsAppearance() {
	const dispatch = useDispatch()
	const appearance = useSelector(state=>state.local.appearance)

	const onSelect = id=>
		dispatch(setAppearance(id))

	return (
		<ScrollForm>
			<Form>
				<PickFlatList
					options={themes}
					selected={appearance}
					onSelect={onSelect} />
			</Form>
		</ScrollForm>
	)
}

SettingsAppearance.options = {
	title: t.s('interfaceStyle')
}

export default SettingsAppearance