import t from 't'
import { links } from 'config'

import { WebView } from 'co/native'

function SettingsBackup() {
	return (
		<WebView 
			source={{uri: links.app.settings.backups}} />
	)
}

SettingsBackup.options = {
	title: t.s('backups')
}

export default SettingsBackup