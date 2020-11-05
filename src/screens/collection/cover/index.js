import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import View from './view'

class PickCoverScreen extends React.Component {
	static defaultProps = {
		route: {} //params: {onChange}
	}

	static options({color}) {
		return {
			tintColor: color,

			topBar: {
				title: {
					text: t.s('changeIcon')
				},
				rightButtons: [{
					id: 'clear',
					text: t.s('remove') + ' ' + t.s('icon').toLowerCase()
				}]
			},

			animations: {
				push: {
                    waitForRender: !Platform.isPad, //on iPad glitches layout size
				}
			}
		}
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'clear':
				this.onSelect('')
			break
		}
	}

	onSelect = (cover)=>{
		this.props.route.params.onChange && this.props.route.params.onChange({ cover: [cover] })
		this.props.navigation.goBack()
	}

	render() {
		return (
			<View
				{...this.props}
				onSelect={this.onSelect} />
		)
	}
}

export default PickCoverScreen