import React from 'react'
import t from 't'
import WebView from 'co/common/webview'

export default class SettingsBackup extends React.Component {
    static options = {
        title: t.s('backups')
    }

	render() {
		return (
			<WebView 
				link='https://app.raindrop.io/settings/backups?frame=1' />
		)
	}
}