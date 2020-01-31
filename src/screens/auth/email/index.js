import React from 'react'
import _ from 'lodash-es'
import View from './view'

export default class AuthEmailScreen extends React.Component {
	static defaultProps = {
		isModal: true
	}

	static options() {
		return {
			style: 'form',
			modalPresentationStyle: 'pageSheet',

			topBar: {
				elevation: 0,
				title: {
					component: {
						name: 'component/logoText',
						alignment: 'center'
					}
				}
			},

			animations: {
				push: {
                    waitForRender: true,
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