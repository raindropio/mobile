import React from 'react'
import _ from 'lodash'
import Navigation from 'modules/navigation'
import View from './view'

class PickTagsScreen extends React.Component {
	static defaultProps = {
		isModal: true
	}

	static options({title}) {
		return {
			style: 'form',
			topBar: {
				title: {
					text: title
				}
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

	closeScreen = ()=>{
		Navigation.close(this.props)
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'done':
				this.closeScreen()
			break;
		}
	}

	onSelect = (tags)=>{
		this.closeScreen()
		this.props.onSelect(tags)
	}

	render() {
		return (
			<View
				{...this.props}
				onSelect={this.onSelect} />
		)
	}
}

export default PickTagsScreen