import { Alert } from 'react-native'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { set } from 'data/actions/config'

import languages from 'assets/languages/index.json'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

function SettingsLanguage() {
	const dispatch = useDispatch()
	const lang = useSelector(state=>state.config.lang)

	const options = [
		{ id: '', label: t.s('automatically') },
		...Object.keys(languages).map(id=>({
			id,
			label: languages[id]
		}))
	]

	const onSelect = id=>{
		dispatch(set('lang', id))
		Alert.alert('Please restart the app', 'You need to restart the app to apply language change.')
	}

	return (
		<ScrollForm>
			<Form>
				<PickFlatList
					options={options}
					selected={lang}
					onSelect={onSelect} />
			</Form>
		</ScrollForm>
	)
}

SettingsLanguage.options = {
	title: t.s('language')
}

export default SettingsLanguage