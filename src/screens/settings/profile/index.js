import t from 't'
import { links } from 'config'

import { WebView } from 'co/native'

function SettingsProfile() {
	return (
		<WebView source={{uri: links.app.settings.account}} />
	)
}

SettingsProfile.options = {
	title: t.s('accountSettings')
}

export default SettingsProfile