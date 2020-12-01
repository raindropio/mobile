import React from 'react'
import t from 't'
import { WebView } from 'co/native'

export default class SettingsProfile extends React.Component {
    static options = {
        title: t.s('profile')
    }

	render() {
		return (
			<WebView source={{uri: 'https://app.raindrop.io/settings/account?frame=1'}} />
		)
	}
}