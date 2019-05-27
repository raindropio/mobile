import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import _ from 'lodash'
import View from './view'

class SettingsScreen extends React.Component {
	static options() {
		return {
			style: 'form',

			topBar: {
				title: {
					component: {
						name: 'component/logoText',
						alignment: Platform.OS == 'ios' ? 'center' : 'fill'
					}
				},
				rightButtons: [
					{
						id: 'logout',
						text: t.s('logOut')
					}
				]
			},

			bottomTab: {
				icon: require('assets/images/tab/settings.png'),
				text: t.s('settings')
			}
		}
	}

	render() {
		return (
			<View 
				{...this.props} />
		)
	}
}

export default SettingsScreen