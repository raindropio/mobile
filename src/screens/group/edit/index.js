import t from 't'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import { group } from 'data/selectors/collections'

import Form from './form'

class EditGroupScreen extends React.PureComponent {
	static options = {
		title: t.s('group'),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	state = {
		title: this.props.title
	}

	componentWillUnmount() {
		if ((this.state.title||'').trim())
			this.props.actions.collections.groupRename(
				this.props.route.params._id,
				this.state.title
			)
	}

	onRemove = ()=>{
		if (this.props.collections.length)
			return this.props.navigation.navigate('notEmpty')
		else
			return this.props.actions.collections.groupRemove(this.props.route.params._id, ()=>this.onClose())
	}

	onChange = (changed)=>{
		this.setState({
			...this.state,
			...changed
		})
	}

	onClose = ()=>
		this.props.navigation.goBack()

	render() {
		return (
			<Form 
				navigation={this.props.navigation}
				title={this.state.title}
				onSave={this.onClose}
				onChange={this.onChange}
				onRemove={this.onRemove} />
		)
	}
}

export default connect(
	(state, { route: { params={} } })=>
		group(state, params._id),
	(dispatch)=>({
		actions: {
			collections: bindActionCreators(collectionsActions, dispatch)
		}
	})
)(EditGroupScreen)