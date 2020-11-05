import React from 'react'
import t from 't'
import WebView from 'co/common/webview'

export default class SettingsProfile extends React.Component {
    static options = {
        title: t.s('profile')
    }

	render() {
		return (
			<WebView 
				link='https://app.raindrop.io/settings/account?frame=1' />
		)
	}
}