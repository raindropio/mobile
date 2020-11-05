import React from 'react'
import t from 't'
import View from './view'
import { fastFade } from 'co/style/animation'

class ProBuyScreen extends React.PureComponent {
	static options({ route: { params={} } }) {
		return {
			title: params.active ? t.s('change') + ' ' + t.s('subscription').toLowerCase() : t.s('upgradeToPro')
		}
	}

	componentDidUpdate(prevProps) {
		//animation
		if (prevProps.loading != this.props.loading)
			fastFade()
	}

	onClose = ()=>
		this.props.navigation.goBack()

	render() {
		return (
			<View 
				{...this.props}
				onClose={this.onClose} />
		)
	}
}

export default ProBuyScreen