import t from 't'
import React from 'react'
import { connect } from 'react-redux'
import { groupCreate } from 'data/actions/collections'

import { Buttons, Button } from 'co/navigation/header'
import Form from '../edit/form'

class EditGroupScreen extends React.PureComponent {
	static options = {
		title: t.s('newString') + ' ' + t.s('group').toLowerCase()
	}

	state = {
		title: '',
		loading: false
	}

	onSave = ()=>{
		this.setState({ loading: true })

		this.props.groupCreate(
			this.state.title,
			()=>{
				this.setState({ loading: false })
				this.props.navigation.goBack()
			},
			()=>
				this.setState({ loading: false })
		)
	}

	onChange = (changed)=>
		this.setState({
			...this.state,
			...changed
		})

	renderButtons = ()=>{
		const { title='', loading } = this.state
		const disabled = !title.trim() || loading

		return (
			<Buttons>
				<Button 
					title={t.s('create')}
					disabled={disabled}
					bold
					onPress={this.onSave} />
			</Buttons>
		)
	}

	render() {
		return (
			<>
				{this.renderButtons()}

				<Form 
					title={this.state.title}
					onSave={this.onSave}
					onChange={this.onChange}
					onRemove={this.onRemove} />
			</>
		)
	}
}

export default connect(
	undefined,
	{ groupCreate }
)(EditGroupScreen)