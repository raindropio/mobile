import React from 'react'
import fadeIn from 'co/screen/animations/fadeIn'
import Navigation from 'modules/navigation'
import t from 't'
import View from './view'
import {fastFade} from 'co/style/animation'

class ProBuyScreen extends React.PureComponent {
	static defaultProps = {
		isModal: true
	}
	
	static options({active}) {
		return {
			style: 'form',

			topBar: {
				title: {
					text: active ? t.s('change') + ' ' + t.s('subscription').toLowerCase() : t.s('upgradeToPro'),
				},
				largeTitle: {
					visible: true
				},
				noBorder: false,
				borderHeight: 1
			},

			animations: {
				push: {
					content: fadeIn
				}
			}
		}
	}

	componentDidUpdate(prevProps) {
		//animation
		if (prevProps.loading != this.props.loading)
			fastFade()
	}

	onClose = ()=>{
		Navigation.close(this.props)
	}

	render() {
		return (
			<View 
				{...this.props}
				onClose={this.onClose} />
		)
	}
}

export default ProBuyScreen