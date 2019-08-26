import React from 'react'
import Navigation from 'modules/navigation'

import doneButton from 'co/screen/buttons/done'
import Settings from 'screens/collection/edit/settings'
import { ScrollForm } from 'co/style/form'
import Trash from './trash'

class SystemCollection extends React.PureComponent {
	static options({ title, color }) {
		return {
			style: 'form',
			tintColor: color,
	
			topBar: {
				borderHeight: 1,
				noBorder: false,

				title: {
					text: title
				},
				...doneButton
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
	
	onClose = ()=>Navigation.close(this.props)

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'done':
				this.onClose()
			break
		}
	}

	render() {
		return (
			<ScrollForm>
				<Settings 
					{...this.props} />

				<Trash
					{...this.props} />
			</ScrollForm>
		)
	}
}

export default SystemCollection