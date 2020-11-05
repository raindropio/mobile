import t from 't'
import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagsActions from 'data/actions/tags'

import Form from './form'

class EditTagScreen extends React.PureComponent {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				tagName: PropTypes.string
			})
		})
	}

	static options = {
		title: t.s('edit') + ' ' + t.s('tag').toLowerCase()
	}

	state = {
		tagName: this.props.route.params.tagName
	}

	componentWillUnmount() {
		if (this.state.tagName.trim())
            this.props.actions.tags.oneRename(this.props.route.params.tagName, this.state.tagName)
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'done':
				this.onClose()
			break
		}
	}

	onRemove = ()=>{
		this.props.actions.tags.oneRemove(this.props.route.params.tagName, this.onClose)
	}

	onChange = (changed)=>{
		this.setState({
			...this.state,
			...changed
		})
	}

	onClose = ()=>{
		this.props.navigation.goBack()
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