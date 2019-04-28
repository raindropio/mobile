import React from 'react'
import _ from 'lodash'
import View from './view'

export default class AuthEmailScreen extends React.Component {
	static defaultProps = {
		isModal: true
	}

	static options() {
		return {
			style: 'form',

			topBar: {
				elevation: 0,
				title: {
					component: {
						name: 'component/logoText',
						alignment: 'center'
					}
				}
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