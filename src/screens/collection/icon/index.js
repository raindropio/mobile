import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import t from 't'
import View from './view'

class PickIconScreen extends React.Component {
	static propTypes = {
		cover_path:	PropTypes.string,
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
			}
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
				this.onSelect('','')
			break
		}
	}

	onSelect = (cover_path, cover)=>{
		this.props.onChange({cover_path, cover})
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

export default PickIconScreen