import t from 't'
import _ from 'lodash'
import React from 'react'
import Navigation from 'modules/navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import { group } from 'data/selectors/collections'

import doneButton from 'co/screen/buttons/done'
import Form from './form'

class EditGroupScreen extends React.PureComponent {
	static options() {
		return {
			style: 'form',

			topBar: {
				title: {
					text: t.s('edit') + ' ' + t.s('group').toLowerCase()
				},
				...doneButton
			},

			bottomTabs: {
				visible: false,
				drawBehind: true
			}
		}
	}

	constructor(props) {
		super(props)

		this.state = {
			title: this.props.title
		}

		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		if (this.state.title.trim())
			this.props.actions.collections.groupRename(
				this.props._id,
				this.state.title
			)

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
		if (this.props.collections.length)
			return Navigation.push(this.props, 'collections/group/notEmpty')
		else
			return this.props.actions.collections.groupRemove(this.props._id, ()=>this.onClose())
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
				title={this.state.title}
				onSave={this.onClose}
				onChange={this.onChange}
				onRemove={this.onRemove} />
		)
	}
}

export default connect(
	(state, {_id})=>group(state, _id),
	(dispatch)=>({
		actions: {
			collections: bindActionCreators(collectionsActions, dispatch)
		}
	})
)(EditGroupScreen)