import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { setBrowser } from 'local/actions'

import browsersList from 'assets/browsers'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

function SettingsBrowser({ navigation }) {
	const dispatch = useDispatch()
	const browser = useSelector(state=>state.local.browser)

	const onSelect = id=>{
		dispatch(setBrowser(id))
		navigation.goBack()
	}

	return (
		<ScrollForm>
			<Form>
				<PickFlatList
					options={browsersList}
					selected={browser}
					onSelect={onSelect} />
			</Form>
		</ScrollForm>
	)
}

SettingsBrowser.options = {
	title: t.s('openInBrowser')
}

export default SettingsBrowser