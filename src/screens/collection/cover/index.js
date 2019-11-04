import React from 'react'
import PropTypes from 'prop-types'
import fadeIn from 'co/screen/animations/fadeIn'
import Navigation from 'modules/navigation'
import t from 't'
import View from './view'

class PickCoverScreen extends React.Component {
	static propTypes = {
		onChange:	PropTypes.func
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
					text: t.s('removeIt') + ' ' + t.s('icon').toLowerCase()
				}]
			},

			animations: {
				push: {
                    waitForRender: true,
				}
			}

			/*animations: {
				push: {
					waitForRender: true,
					topBar: fadeIn,
					content: fadeIn
				}
			}*/
		}
	}

	constructor(props) {
		super(props)
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'clear':
				this.onSelect('')
			break
		}
	}

	onSelect = (cover)=>{
		this.props.onChange && this.props.onChange({ cover: [cover] })
		Navigation.close(this.props)
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