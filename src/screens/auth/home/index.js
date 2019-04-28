import React from 'react'
import { themed } from 'co/style/colors'
import View from './view'

export default class AuthWelcomeScreen extends React.Component {
	static options() {
		return {
			layout: {
				orientation: 'portrait'
			},
			topBar: {
				visible: false,
				drawBehind: true
			},
			statusBar: {
				backgroundColor: themed.mainAlt()
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