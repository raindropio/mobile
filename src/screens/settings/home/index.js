import React from 'react'
import t from 't'
import _ from 'lodash'
import View from './view'

class SettingsScreen extends React.Component {
	static options() {
		return {
			style: 'form',

			topBar: {
				title: {
					text: t.s('settings')
				}
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