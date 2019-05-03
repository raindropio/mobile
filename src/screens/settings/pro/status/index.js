import React from 'react'
import t from 't'
import View from './view'

class ProStatusScreen extends React.PureComponent {
	static options = ()=>({
		topBar: {
			title: {
				text: t.s('upgradeAccount'),
			},
			largeTitle: {
				visible: true
			},
			noBorder: false,
			borderHeight: 1
		}
	})

	render() {
		return (
			<View 
				{...this.props} />
		)
	}
}

export default ProStatusScreen