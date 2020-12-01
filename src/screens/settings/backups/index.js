import React from 'react'
import t from 't'
import { WebView } from 'co/native'

export default class SettingsBackup extends React.Component {
    static options = {
        title: t.s('backups')
    }

	render() {
		return (
			<WebView 
				source={{uri: 'https://app.raindrop.io/settings/backups?frame=1'}} />
		)
	}
}