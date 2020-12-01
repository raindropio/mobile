import t from 't'
import React from 'react'
import { connect } from 'react-redux'
import { groupRename } from 'data/actions/collections'
import { group } from 'data/selectors/collections'

import { Input } from 'co/form'

class EditGroupTitle extends React.PureComponent {
	state = {
		title: this.props.title
	}

	componentWillUnmount() {
		if ((this.state.title||'').trim())
			this.props.groupRename(
				this.props._id,
				this.state.title
			)
	}

	onTitleChange = (title)=>
		this.setState({ title })

	render() {
		const { title } = this.state

		return (
			<Input 
				last
				heading
                value={title}
                placeholder={t.s('name')}
                returnKeyType='done'
                onChangeText={this.onTitleChange}
                onSubmitEditing={this.props.navigation.goBack} />
		)
	}
}

export default connect(
	(state, { _id })=>
		group(state, _id),
	{ groupRename }
)(EditGroupTitle)