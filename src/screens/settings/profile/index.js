import { Component } from 'react';
import t from 't'
import { links } from 'config'

import { WebView } from 'co/native'

export default class SettingsProfile extends Component {
    static options = {
        title: t.s('profile')
    }

	render() {
		return (
			<WebView source={{uri: links.app.settings.account}} />
		)
	}
}