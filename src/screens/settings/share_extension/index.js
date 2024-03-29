import { useContext, useCallback } from 'react';
import { Linking, Platform } from 'react-native'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { set } from 'data/actions/config'
import { links } from 'config'
import { ThemeContext } from 'styled-components/native'

import options from './options'
import { Form, ScrollForm, FormSection } from 'co/form'
import { SectionText } from 'co/style/section'
import PickFlatList from 'co/list/flat/pick'
import Toggle from 'co/form/toggle'
import Button from 'co/button'

function SettingsExtensionMode() {
	const dispatch = useDispatch()

	const { isExtension } = useContext(ThemeContext)
	const { add_default_collection, mobile_add_auto_save } = useSelector(state=>state.config)

	const changeAddAutoSave = useCallback(mobile_add_auto_save=>{
		dispatch(set({ mobile_add_auto_save }))
	}, [])

	const changeAddDefaultCollection = useCallback((add_default_collection)=>{
		dispatch(set({ add_default_collection }))
	}, [])

	const howTo = useCallback(()=>{
		Linking.openURL(links.help.shareExtension[Platform.OS])
	}, [])

	return (
		<ScrollForm>
			<FormSection><SectionText>{t.s('newBookmark')}</SectionText></FormSection>
			<Form>
				<Toggle 
					last
					value={mobile_add_auto_save}
					onChange={changeAddAutoSave}
					label={t.s('save') + ' ' + t.s('automatically').toLowerCase()} />
			</Form>

			<FormSection><SectionText>{t.s('defaultCollection')}</SectionText></FormSection>
			<Form>
				<PickFlatList
					options={options}
					selected={add_default_collection}
					onSelect={changeAddDefaultCollection} />
			</Form>

			{isExtension ? (
				<SectionText center>{t.s('changeLaterInSettings')}</SectionText>
			) : (
				<Button 
					title={t.s('howToUse')}
					onPress={howTo} />
			)}
		</ScrollForm>
	)
}

SettingsExtensionMode.options = {
	title: t.s('shareExtension')
}

export default SettingsExtensionMode