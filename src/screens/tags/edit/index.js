import t from 't'
import _ from 'lodash'
import React from 'react'
import Navigation from 'modules/navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagsActions from 'data/actions/tags'

import doneButton from 'co/screen/buttons/done'
import Form from './form'

class EditTagScreen extends React.PureComponent {
	static options() {
		return {
			style: 'form',

			topBar: {
				title: {
					text: t.s('edit') + ' ' + t.s('tag').toLowerCase()
				},
				largeTitle: {
					visible: true
				},
				...doneButton
			}
		}
	}

	constructor(props) {
		super(props)

		this.state = {
			tagName: this.props.tagName
		}

		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		if (this.state.tagName.trim())
            this.props.actions.tags.oneRename(this.props.tagName, this.state.tagName)

		this._navigationEvents && this._navigationEvents.remove()
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'done':
				this.onClose()
			break
		}
	}

	onRemove = ()=>{
		this.props.actions.tags.oneRemove(this.props.tagName, this.onClose)
	}

	onChange = (changed)=>{
		this.setState({
			...this.state,
			...changed
		})
	}

	onClose = ()=>{
		Navigation.close(this.props)
	}

	render() {
		return (
			<Form 
				{...this.state}
				onSave={this.onClose}
				onChange={this.onChange}
				onRemove={this.onRemove} />
		)
	}
}

export default connect(
	undefined,
	(dispatch)=>({
		actions: {
			tags: bindActionCreators(tagsActions, dispatch)
		}
	})
)(EditTagScreen)